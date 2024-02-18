import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Oauth2TokensEntity {
  @PrimaryColumn()
  userId: string

  @Column()
  accessToken: string

  @Column()
  refreshToken: string
}