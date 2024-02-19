import { DocumentationCommonEntity } from "src/common/entities/common.entity";
import { Column } from "typeorm";
import { QueryType } from "../types/types";

export class ApiDocumentationEntity extends DocumentationCommonEntity {

  @Column()
  queryType: QueryType

  @Column()
  endpointName: string
  
  @Column({type: "varchar", length: 50, nullable: true})
  miniDescription: string

  @Column({type: "json", nullable: true})
  params?: Map<string, any>

  @Column({type: "json"})
  examples?: Map<string, any>
}