import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateModSettingDto {
  
  @IsString()
  guildId: string

  @IsNumber()
  defaultWarnsToMute?: number;

  @IsNumber()
  defaultTimeout?: number;

  @IsString({each: true})
  @IsArray()
  defaultReason?: string;

  @IsString({each: true})
  @IsArray()
  trustedBanRoles?: string[];

  @IsString({each: true})
  @IsArray()
  trustedMuteRoles?: string[];

  @IsString({each: true})
  @IsArray()
  muteRole?: string;

  @IsString({each: true})
  @IsArray()
  warnRole?: string;

  @IsString({each: true})
  @IsArray()
  modRoles?: string[];
}
