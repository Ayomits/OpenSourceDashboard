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
      const isAuth = await new IsAuth(this.jwtService).canActivate(context)
      if (!isAuth) {
        console.log(isAuth);
        return false
      }
      if (!req.user.isAdmin) {
        console.log(req.user.isAdmin);
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}