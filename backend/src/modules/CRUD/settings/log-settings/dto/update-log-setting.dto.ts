import { PartialType } from '@nestjs/swagger';
import { CreateLogSettingDto } from './create-log-setting.dto';

export class UpdateLogSettingDto extends PartialType(CreateLogSettingDto) {}
