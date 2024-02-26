import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/category/create-category.dto';

@Controller('commands-category')
@ApiTags('commands-category')
export class CategoryController {
  constructor(private readonly commandsService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.commandsService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.commandsService.findAll()
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.commandsService.findOne(+id)

  }

  @Get('/name/:name')
  findByName(@Param('name') name: string){
    return this.commandsService.findByName(name)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandDto: CreateCategoryDto) {
    return this.commandsService.update(+id, updateCommandDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandsService.remove(+id)
  }
}
