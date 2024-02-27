import { Injectable } from '@nestjs/common';
import { CreateCommandsGqlInput } from './dto/create-commands-gql.input';
import { UpdateCommandsGqlInput } from './dto/update-commands-gql.input';

@Injectable()
export class CommandsGqlService {
  create(createCommandsGqlInput: CreateCommandsGqlInput) {
    return 'This action adds a new commandsGql';
  }

  findAll() {
    return `This action returns all commandsGql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commandsGql`;
  }

  update(id: number, updateCommandsGqlInput: UpdateCommandsGqlInput) {
    return `This action updates a #${id} commandsGql`;
  }

  remove(id: number) {
    return `This action removes a #${id} commandsGql`;
  }
}
