import { IsString } from "class-validator";

export class CreateLogSettingDto {

  @IsString()
  guildId: string
  
  @IsString()
  chatLogChannel?: string

  @IsString()
  voiceLogChannel?: string

  @IsString()
  economyLogChannel?: string
}