import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { Request } from 'express';
import axios from 'axios';
import { DataHeadersType, TokensResponseType } from './types/discordApi.types';
import { UserEntity } from './entities/user.entity';

// Only Auth with discord


@Injectable()
export class AuthService {

  constructor (
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async generateLoginDiscordLink() { // algorithm which generate Discord Oauth2 link
    let baseUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}`

    let scopes = `&scope=`
    const scopesFromEnv = JSON.parse(process.env.SCOPES || '["guilds", "identify", "email"]') as string[]
    for (let i = 0; i < scopesFromEnv.length; i++) {
      scopes += `${scopesFromEnv[i]}+`
    }
    
    baseUrl += scopes.slice(0, -1)

    return baseUrl
  }

  async handleDiscordCallback(req: Request) {
    try {
      const code = req.query.code as string // as string because req.query.code has any type
      const tokens = await this.fetchTokens(code)
      const headers = {
        "Authorization": `Bearer ${tokens.accessToken}`,
        "Content-Type": "application/json"
      } as DataHeadersType
      const userData = (await this.fetchUserData(headers)).data
      const user = await this.userService.createUser({userId: userData.id, avatar: userData.avatar, username: userData.username})
      const jwt = await this.generateJwt(user)
      const tokensInDb = await this.userService.createTokens({userId: user.userId, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken})
      return {
        "accessToken": jwt,
        "discordTokens": tokensInDb
      }
    } catch(err) {
      throw new BadRequestException(err)
    }
  }

  private async fetchTokens(code: string): Promise<TokensResponseType> {
    const data = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
      scope: JSON.parse(process.env.SCOPES),
    }

    try {
      const req = await axios.post('https://discord.com/api/oauth2/token', data, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })

      return {
        accessToken: req.data?.access_token,
        refreshToken: req.data?.refresh_token
      }
    } catch (err) {
      throw new BadRequestException(err)
    }
  } // Access and refresh discord tokens

  private async fetchUserData(headers: DataHeadersType) {
    return await axios.get("https://discord.com/api/users/@me", { headers: headers })
  }

  private async generateJwt(user: UserEntity) {
    const payload = {
      "userId": user.userId,
      "username": user.username,
      "avatar": user.avatar
    }
    
    return this.jwtService.sign(payload); // null
    
  }
}
