import { Injectable } from '@nestjs/common';
import { CreateLogSettingsGqlInput } from './dto/create-log-settings-gql.input';
import { UpdateLogSettingsGqlInput } from './dto/update-log-settings-gql.input';

@Injectable()
export class LogSettingsGqlService {
  create(createLogSettingsGqlInput: CreateLogSettingsGqlInput) {
    return 'This action adds a new logSettingsGql';
  }

  findAll() {
    return `This action returns all logSettingsGql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logSettingsGql`;
  }

  update(id: number, updateLogSettingsGqlInput: UpdateLogSettingsGqlInput) {
    return `This action updates a #${id} logSettingsGql`;
  }

  remove(id: number) {
    return `This action removes a #${id} logSettingsGql`;
  }
}
