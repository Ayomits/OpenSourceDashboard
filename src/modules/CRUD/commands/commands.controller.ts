import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CreateCommandDto } from './dto/command/create-command.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsAdmin } from 'src/modules/auth/guards/isAdmin.guard';

// Only Admins can add new Commands or something

@Controller('commands')
@ApiTags("commands-documentation")
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post()
  @UseGuards(IsAdmin)
  create(@Body() createCommandDto: CreateCommandDto) {
    return this.commandsService.create(createCommandDto);
  }

  @Get()
  findAll() {
    return this.commandsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.commandsService.findById(+id);
  }

  @Get('/category/:categoryId')
  findByCategory(@Param(`categoryId`) categoryId: string) {
    return this.commandsService.findByCategory(+categoryId)
  }

  @Patch(':id')
  @UseGuards(IsAdmin)
  update(@Param('id') id: string, @Body() updateCommandDto: CreateCommandDto) {
    return this.commandsService.update(+id, updateCommandDto);
  }

  @Delete(':id')
  @UseGuards(IsAdmin)
  remove(@Param('id') id: string) {
    return this.commandsService.remove(+id);
  }
}
