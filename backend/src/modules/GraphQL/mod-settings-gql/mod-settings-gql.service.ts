import { Injectable } from '@nestjs/common';
import { CreateModSettingsGqlInput } from './dto/create-mod-settings-gql.input';
import { UpdateModSettingsGqlInput } from './dto/update-mod-settings-gql.input';

@Injectable()
export class ModSettingsGqlService {
  create(createModSettingsGqlInput: CreateModSettingsGqlInput) {
    return 'This action adds a new modSettingsGql';
  }

  findAll() {
    return `This action returns all modSettingsGql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modSettingsGql`;
  }

  update(id: number, updateModSettingsGqlInput: UpdateModSettingsGqlInput) {
    return `This action updates a #${id} modSettingsGql`;
  }

  remove(id: number) {
    return `This action removes a #${id} modSettingsGql`;
  }
}
