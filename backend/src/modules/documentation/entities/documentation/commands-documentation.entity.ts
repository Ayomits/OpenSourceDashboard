import { DocumentationCommonEntity } from "src/common/entities/common.entity";
import { Column, ManyToOne, OneToOne } from "typeorm";
import { QueryType } from "../../types/types";
import { CommandsCategoryEntity } from "../category/commands-category.entity";

export class CommandsDocumentationEntity extends DocumentationCommonEntity {

  @Column()
  name: string

  @Column()
  miniDescription: string

  @Column({type: 'json'})
  examples: Map<string, string>

  @ManyToOne(() => CommandsCategoryEntity, category => category.commands)
  category: CommandsCategoryEntity
}