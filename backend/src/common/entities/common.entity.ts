import {CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from 'typeorm'

@Entity({ synchronize: false })
export abstract class DiscordCommonEntity {
  @PrimaryColumn()
  userId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

@Entity({synchronize: false})
export abstract class GuildCommonEntity{
  @PrimaryColumn()
  guildId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}