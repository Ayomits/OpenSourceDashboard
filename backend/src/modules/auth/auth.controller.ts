import { Controller, Get, Req, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CustomCacheInterceptor } from 'src/interceptors/cache.interceptors';

// Only work with Discord Api and their Oauth2
// 


@Controller('auth')
@ApiTags("auth")
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  @Get('discord/loginlink')
  // Only for frontend. It's generate link by env settings
  discordLoginLink() {
    return this.authService.generateLoginDiscordLink()
  }

  @Get('discord/callback')
  @UseInterceptors(CustomCacheInterceptor)
  async discordCallback(
    @Req() req: Request,
    @Res() res: Response
    ) {
    const result = await this.authService.handleDiscordCallback(req)
    if (result) {
      return res.redirect(process.env.FRONTEND_URL + `?accessToken=${result}`)
    }
    return res.status(401).send()
  }

}
