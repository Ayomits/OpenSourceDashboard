import { GuildCommonEntity } from "src/common/entities/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class LogSettingEntity extends GuildCommonEntity {

  @Column()
  chat: string

  @Column()
  voice: string

  @Column()
  economy: string
}
