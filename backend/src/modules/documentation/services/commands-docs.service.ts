import { Injectable } from '@nestjs/common';
import { CreateDocumentationDto } from '../dto/create-documentation.dto';
import { UpdateDocumentationDto } from '../dto/update-documentation.dto';

@Injectable()
export class CommandsDocumentationService {
  create(createDocumentationDto: CreateDocumentationDto) {
    return 'This action adds a new documentation';
  }

  findAll() {
    return `This action returns all documentation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentation`;
  }

  update(id: number, updateDocumentationDto: UpdateDocumentationDto) {
    return `This action updates a #${id} documentation`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentation`;
  }
}
