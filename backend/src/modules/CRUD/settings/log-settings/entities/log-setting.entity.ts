import { GuildCommonEntity } from "src/common/entities/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class LogSettingEntity extends GuildCommonEntity {

  @Column({nullable: true, default: null})
  chatLogChannel: string

  @Column({nullable: true, default: null})
  voiceLogChannel: string

  @Column({nullable: true, default: true})
  economyLogChannel: string
}
