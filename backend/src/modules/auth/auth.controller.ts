import { Controller, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

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
  discordCallback(@Req() req: Request) {
    return this.authService.handleDiscordCallback(req)
  }

}
