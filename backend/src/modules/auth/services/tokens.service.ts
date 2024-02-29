import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Oauth2TokensEntity } from "../entities/tokens.entity";
import {
  DataHeadersType,
  GuildType,
  ITokensDbType,
} from "../types/discordApi.types";
import axios from "axios";
import { Cache } from "@nestjs/cache-manager";

// Working with Oauth2TokensEntity

@Injectable()
export class TokensService {
  ttl: number = 60_000

  constructor(
    @InjectRepository(Oauth2TokensEntity)
    private tokensRepository: Repository<Oauth2TokensEntity>,
    private readonly cacheManager: Cache,
  ) {}

  async findTokens(userId: string) {
    const tokensInCache = await this.cacheManager.get(`tokens-${userId}`)

    if (tokensInCache) {
      return tokensInCache
    }

    return await this.tokensRepository.findOne({
      where: { userId: userId },
    });
  }

  async createTokens(data: ITokensDbType) {
    const key = `tokens-${data.userId}`
    const existedTokens = await this.cacheManager.get(key) || await this.findTokens(data.userId)

    if (existedTokens) {
      await this.tokensRepository.update(data.userId, {
        refreshToken: data.refreshToken,
        accessToken: data.accessToken,
      }); // updating tokens in db
      const newTokens = await this.tokensRepository.find({where: {userId: data.userId}}) // find tokens in db
      await this.cacheManager.set(key, newTokens, this.ttl) // save tokens in cache
      return newTokens // return tokens
    }

    const query = this.tokensRepository.create(data); // create input query
    const tokens = await this.tokensRepository.save(query); // execute
    await this.cacheManager.set(key, tokens, this.ttl) // save tokens to cache
    return tokens // return tokens
  }

  async findGuildData(userId: string, count: number = 0) {
    const dataInCache = await this.cacheManager.get(`guilds-user-${userId}`) // guilds data
    if (dataInCache) {
      return dataInCache
    }
    if (count < 3) {
      try {
        const tokens = await this.findTokens(userId) as Oauth2TokensEntity
        const guilds = await this.fetchGuilds(
          tokens.accessToken,
          tokens.refreshToken
        );

        if (!guilds) {
          throw new BadRequestException(
            "Something wrong... Maybe you are not authorized"
          );
        }
        const sortedGuilds = await this.sortGuilds(guilds);
        await this.cacheManager.set(`guilds-user-${userId}`, sortedGuilds, this.ttl)
        return sortedGuilds
      } catch (err) {
        return this.retryFunction(() => this.findGuildData(userId, count + 1));
      }
    } else {
      throw new BadRequestException(`Timeout error`);
    }
  }

  // Retry functions it's function which let make fault tolerance

  private async retryFunction(func: Function, count: number = 0) { 
    try {
      return await func();
    } catch (error) {
      if (count < 3) {
        return this.retryFunction(func, count + 1);
      } else {
        throw new BadRequestException("Maximum retry attempts reached");
      }
    }
  }

  //exchange refresh to new Access token
  private async refreshTokens(refreshToken: string) { // if accessToken in db expired, we would update 
    try {
      const headers = {
        Authorization: `refresh token ${refreshToken}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `https://discord.com/api/oauth2/token/revoke`,
        { headers: headers }
      );
      return response.data.accessToken;
    } catch (err) {
      throw new BadRequestException(err.message || err);
    }
  }

  // Fetch guild data with access token and refresh token from discord API
  private async fetchGuilds(
    accessToken: string,
    refreshToken: string,
    count: number = 0
  ): Promise<GuildType[]> {
    try {
      if (count < 3) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        } as DataHeadersType;

        const response = await axios.get(
          "https://discord.com/api/users/@me/guilds",
          { headers: headers }
        );

        if (response.status === 401) {
          const newToken = await this.refreshTokens(refreshToken);
          return await this.fetchGuilds(newToken, refreshToken);
        }

        return response.data as GuildType[];
      } else {
        throw new BadRequestException("Query error. Tokens in DB expired");
      }
    } catch (error) {
      throw new BadRequestException(`Query error: ${error.message || error}`);
    }
  }

  // Sorting user guilds when user admin or owner
  private async sortGuilds(guildsData: GuildType[]): Promise<GuildType[]> { 
    const guilds = guildsData
      .filter((guild) => guild.owner || guild.permissions & 8)
      .map((guild) => ({
        id: guild.id,
        owner: guild.owner,
        permissions: guild.permissions,
        icon: guild.icon,
        name: guild.name,
      }));
    return guilds;
  }
}
