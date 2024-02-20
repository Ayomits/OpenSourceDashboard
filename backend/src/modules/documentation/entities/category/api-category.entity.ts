import { DocumentationCommonEntity } from "src/common/entities/common.entity";
import { Column } from "typeorm";
import { QueryType } from "../../types/types";

export class ApiCategoryEntity extends DocumentationCommonEntity {

  @Column()
  name: string
}