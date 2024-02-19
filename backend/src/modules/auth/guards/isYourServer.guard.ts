import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../services/user.service";
import { UserType } from "../types/user.types";

@Injectable()
export class IsYourServer implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const auth = req.headers.authorization as string;
      const bearer = auth.split(" ")[0];
      const token = auth.split(" ")[1];
      if (bearer !== "Bearer" || !token) {
        return false;
      }
      const user = await this.jwtService.verify(token) as UserType
      if (!user) {
        return false;
      }
      const guildsData = await this.userService.findGuildData(user.userId)
      const guildId = req.body.guildId
      const guild = guildsData.find(guild => guild.id === guildId)
      if (!guild) {
        return false
      }
      req.user = user;
      return true;
    } catch (err) {
      return false;
    }
  }
}