import { IsString } from "class-validator";

export class CreateLogSettingDto {

  @IsString()
  guildId: string
  
  @IsString()
  chat: string

  @IsString()
  voice: string

  @IsString()
  economy: string
}