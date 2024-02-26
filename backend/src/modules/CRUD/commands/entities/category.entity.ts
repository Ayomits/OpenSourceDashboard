import { Entity, Column, OneToMany } from "typeorm";
import { DocumentationCommonEntity } from "src/common/entities/common.entity";
import { CommandEntity } from "./command.entity";

@Entity()
export class CategoryCommandEntity extends DocumentationCommonEntity {

  @Column()
  name: string

  @OneToMany(() => CommandEntity, command => command.category)
  commands: CommandEntity[]
}
