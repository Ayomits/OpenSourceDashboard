import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  userId: string

  @Column()
  username: string

  @Column()
  avatar: string

  @Column({default: false})
  isAdmin: boolean
}

