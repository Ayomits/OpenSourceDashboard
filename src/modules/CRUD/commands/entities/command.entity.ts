import { DocumentationCommonEntity } from "src/common/entities/common.entity";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { CategoryCommandEntity } from "./category.entity";

@Entity()
export class CommandEntity extends DocumentationCommonEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "json", default: [] })
  aliases: string[];

  @Column({default: ``})
  example: string

  @ManyToOne(() => CategoryCommandEntity, (category) => category.commands)
  category: CategoryCommandEntity;
}
