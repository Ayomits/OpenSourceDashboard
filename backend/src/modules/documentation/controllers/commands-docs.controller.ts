import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { IsAdmin } from 'src/modules/auth/guards/isAdmin.guard';
import { CreateDocumentationDto } from '../dto/create-documentation.dto';
import { UpdateDocumentationDto } from '../dto/update-documentation.dto';
import { CommandsDocumentationService } from '../services/commands-docs.service';

@Controller('commands-documentation')
export class CommandsDocumentationController {
  constructor(private readonly documentationService: CommandsDocumentationService) {}

  @Post()
  @ApiTags('commands-documentation')
  @UseGuards(IsAdmin)
  create(@Body() createDocumentationDto: CreateDocumentationDto) {
    return this.documentationService.create(createDocumentationDto);
  }

  @Get()
  findAll() {
    return this.documentationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentationService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(IsAdmin)
  update(@Param('id') id: string, @Body() updateDocumentationDto: UpdateDocumentationDto) {
    return this.documentationService.update(+id, updateDocumentationDto);
  }

  @Delete(':id')
  @UseGuards(IsAdmin)
  remove(@Param('id') id: string) {
    return this.documentationService.remove(+id);
  }
}
