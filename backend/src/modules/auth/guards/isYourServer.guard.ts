import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ExtendedRequest } from "../types/request.types";
import { IsAuth } from "./isAuth.guard";
import { TokensService } from "../services/tokens.service";
import { measureTime } from "src/common/decorators/measureTime.decorator";

@Injectable()
export class IsYourServer implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokensService: TokensService
    ) {}

  @measureTime
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as ExtendedRequest

    try {
      const isAuth = await new IsAuth(this.jwtService).canActivate(context)
      if (!isAuth) {
        console.log(`here0`);
        return false
      }
      const guildsData = await this.tokensService.findGuildData(req.user.userId)
      if (!guildsData) {
        console.log(`here1`);
        return false
      }
      const guildId = req.body.guildId || req.params.guildId
      const guild = guildsData.find(guild => guild.id === guildId)
      if (!guild) {
        console.log(`here2`);
        return false
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}