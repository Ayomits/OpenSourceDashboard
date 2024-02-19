import { DiscordCommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity extends DiscordCommonEntity{

  @Column()
  username: string

  @Column()
  avatar: string

  @Column({default: false})
  isAdmin: boolean
}

