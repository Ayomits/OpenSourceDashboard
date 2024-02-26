import { PartialType } from '@nestjs/swagger';
import { CreateModSettingDto } from './create-mod-setting.dto';

export class UpdateModSettingDto extends PartialType(CreateModSettingDto) {}
