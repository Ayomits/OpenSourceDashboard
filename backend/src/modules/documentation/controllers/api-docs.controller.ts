import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiDocumentationService } from '../services/api-docs.service';
import { CreateDocumentationDto } from '../dto/create-documentation.dto';
import { UpdateDocumentationDto } from '../dto/update-documentation.dto';
import { IsAdmin } from '../../auth/guards/isAdmin.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('api-documentation')
export class ApiDocumentationController {
  constructor(private readonly documentationService: ApiDocumentationService) {}

  @Post()
  @ApiTags('api-documentation')
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
