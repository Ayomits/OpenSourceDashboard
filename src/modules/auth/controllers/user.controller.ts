import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { IsAuth } from "../guards/isAuth.guard";
import { UserService } from "../services/user.service";
import { Request } from "express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../auth.service";
import { ExtendedRequest } from "../types/request.types";
import { TokensService } from "../services/tokens.service";
import { CacheKey } from "@nestjs/cache-manager";

@Controller('users')
@ApiTags('users')
export class UsersController {

  constructor(
    private userService: UserService,
    private tokensService: TokensService,
    private authService: AuthService
    ) {}

  @Get('guildsdata')
  @ApiBearerAuth('jwt')
  @UseGuards(IsAuth)
  @CacheKey(`users`)
  fetchGuildsData(@Req() req: ExtendedRequest) {
    return this.tokensService.findGuildData(req.user.userId)
  }

  @Post("setsuperuser")
  @UseGuards(IsAuth)
  setSuperUser(
    @Req() request: ExtendedRequest,
    @Body('privateKey') privateKey: string
    ) {
      return this.userService.setSuperUser(request, privateKey).then(async user => {
        return {
          "accessToken": await this.authService.generateJwt(user)
        }
      })
  }
}