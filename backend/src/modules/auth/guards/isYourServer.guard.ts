import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ExtendedRequest } from "../types/request.types";
import { IsAuth } from "./isAuth.guard";
import { TokensService } from "../services/tokens.service";
import { measureTime } from "src/common/decorators/measureTime.decorator";
import { Cache } from "@nestjs/cache-manager";

@Injectable()
export class IsYourServer implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokensService: TokensService,
    private readonly cacheManager: Cache
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as ExtendedRequest;

    try {
      const isAuth = await new IsAuth(this.jwtService).canActivate(context);
      if (!isAuth) {
        return false;
      }
      const guildsData =
        (await this.cacheManager.get(req.user.userId)) ||
        (await this.tokensService.findGuildData(req.user.userId));
      if (!guildsData) {
        return false;
      }
      const guildId = req.body.guildId || req.params.guildId;
      const guild = guildsData.find((guild) => guild.id === guildId);
      if (!guild) {
        return false;
      }
      await this.cacheManager.set(req.user.userId, guildsData)
      return true;
    } catch (err) {
      return false;
    }
  }
}
