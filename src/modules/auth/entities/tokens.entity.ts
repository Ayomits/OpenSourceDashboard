import { DiscordCommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Oauth2TokensEntity extends DiscordCommonEntity {

  @Column()
  accessToken: string

  @Column()
  refreshToken: string
}