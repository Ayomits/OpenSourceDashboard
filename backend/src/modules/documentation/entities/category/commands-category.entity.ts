import { DocumentationCommonEntity } from "src/common/entities/common.entity";
import { Column, OneToMany } from "typeorm";
import { CommandsDocumentationEntity } from "../documentation/commands-documentation.entity";

export class CommandsCategoryEntity extends DocumentationCommonEntity {

  @Column()
  name: string

  @OneToMany(() => CommandsDocumentationEntity, command => command.category)
  commands: CommandsDocumentationEntity[];
}