import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserType } from '../types/user.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Oauth2TokensEntity } from '../entities/tokens.entity';
import { DataHeadersType, GuildType, ITokensDbType, TokensResponseType } from '../types/discordApi.types';
import axios from 'axios';
import { measureTime } from '../../../common/decorators/measureTime.decorator';

// Work with UserEntity and getting some data from 

@Injectable()
export class UserService { // CRUD Service. Using only for auth and users controllers

  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(Oauth2TokensEntity) private tokensRepository: Repository<Oauth2TokensEntity>
  ) {}

  async findAllUsers() {
    return this.userRepository.find()
  }
    
  async findUserByUserID(userId: string) {
    return this.userRepository.findOne({where: { userId: userId }})
  }

  @measureTime
  async findGuildData(userId: string) {
    try {
      const tokens = await this.tokensRepository.findOne({where: { userId }})      
      const  headers = {
        "Authorization": `Bearer ${tokens.accessToken}`,
        "Content-Type": "application/json"
      } as DataHeadersType
      const guilds = await (await axios.get("https://discord.com/api/users/@me/guilds", { headers: headers})).data as GuildType[]
      if (!guilds) {
        throw new BadRequestException("Something wrong... Maybe you not authorize")
      }
      return await this.sortGuilds(guilds)
    } catch(err) {
      throw new BadRequestException(err)
    }
  }

  async createUser(data: UserType) {
    const existedUser = await this.findUserByUserID(data.userId)
    if (existedUser) {
      return existedUser
    }
    const query = await this.userRepository.create(data)
    return await this.userRepository.save(query)
  } // Only for Auth

  async createTokens(data: ITokensDbType) {
    const existedTokens = await this.tokensRepository.findOne({where: { userId: data.userId}})
    if (existedTokens) {
      existedTokens.accessToken, existedTokens.refreshToken = data.accessToken, data.refreshToken
      await this.tokensRepository.update(existedTokens.userId, existedTokens)
      return existedTokens
    }
    const query = await this.tokensRepository.create(data)
    return this.tokensRepository.save(query)
  }

  async deleteUserByUserID(userId: string) {
    return this.userRepository.delete(userId)
  }

  @measureTime
  private async sortGuilds(guildsData: GuildType[]): Promise<GuildType[]> {
    const guilds = []; 
    guildsData.forEach((guild: GuildType) => {
      if (guild.owner || guild.permissions & 8) {
        guilds.push({
          id: guild.id,
          owner: guild.owner,
          permissions: guild.permissions,
          icon: guild.icon,
          name: guild.name,
        });
      }
    });

    return guilds
  } // sort guilds where user owner or admin

}
