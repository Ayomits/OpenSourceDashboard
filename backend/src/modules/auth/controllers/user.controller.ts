import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { IsAuth } from "../guards/isAuth.guard";
import { UserService } from "../services/user.service";
import { Request } from "express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../auth.service";

@Controller('users')
@ApiTags('users')
export class UsersController {

  constructor(
    private userService: UserService,
    private authService: AuthService
    ) {}

  @Get('guildsdata')
  @ApiBearerAuth('jwt')
  @UseGuards(IsAuth)
  fetchGuildsData(@Req() req: Request) {
    return this.userService.findGuildData((req as any).user.userId)
  }

  @Post("setsuperuser")
  @UseGuards(IsAuth)
  setSuperUser(
    @Req() request: Request,
    @Body('privateKey') privateKey: string
    ) {
      return this.userService.setSuperUser(request, privateKey).then(async user => {
        return {
          "accessToken": await this.authService.generateJwt(user)
        }
      })
  }
}