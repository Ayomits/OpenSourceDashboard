import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CreateCommandDto } from './dto/command/create-command.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('commands')
@ApiTags("commands-documentation")
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post()
  create(@Body() createCommandDto: CreateCommandDto) {
    return this.commandsService.create(createCommandDto);
  }

  @Get()
  findAll() {
    return this.commandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandDto: CreateCommandDto) {
    return this.commandsService.update(+id, updateCommandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandsService.remove(+id);
  }
}
