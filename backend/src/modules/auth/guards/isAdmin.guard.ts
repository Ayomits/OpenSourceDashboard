import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ExtendedRequest } from "../types/request.types";
import { IsAuth } from "./isAuth.guard";

@Injectable()
export class IsAdmin implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as ExtendedRequest

    try {
      const isAuth = new IsAuth(this.jwtService).canActivate(context)
      if (!isAuth) {
        return false
      }
      if (req.user.isAdmin) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}