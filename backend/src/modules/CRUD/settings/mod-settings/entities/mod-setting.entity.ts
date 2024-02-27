import { GuildCommonEntity } from "src/common/entities/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class ModSettingsEntity extends GuildCommonEntity {

  @Column({nullable: true, default: 3})
  defaultWarnsToMute: number

  @Column({nullable: true, default: "Not stated"})
  defaultReason: string

  @Column({nullable: true, default: 82_000})
  defaultTimeout: number

  @Column({type: 'json' ,nullable: true})
  trustedBanRoles: string[]

  @Column({type: 'json', nullable: true})
  trustedMuteRoles: string[]

  @Column({nullable: true})
  muteRole: string

  @Column({nullable: true})
  warnRole: string
  
  @Column({type: 'json' ,nullable: true})
  modRoles: string[]
}
