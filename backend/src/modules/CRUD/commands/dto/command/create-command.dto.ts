import { IsArray, IsNumber, IsString } from "class-validator"

export class CreateCommandDto {

  @IsString()
  name: string

  @IsString()
  description: string

  @IsArray()
  @IsString({each: true})
  aliases?: string[]

  @IsString()
  example: string

  @IsNumber()
  categoryID: number
}
