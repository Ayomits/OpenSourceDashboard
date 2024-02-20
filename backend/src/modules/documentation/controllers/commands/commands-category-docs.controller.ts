import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsAdmin } from 'src/modules/auth/guards/isAdmin.guard';
import { CommandsDocumentationService } from '../../services/commands-docs.service';

@Controller('commands-category')
@ApiTags('commands-category')
export class CommandsCategoryController {
  constructor(private readonly documentationService: CommandsDocumentationService) {}

  
}
