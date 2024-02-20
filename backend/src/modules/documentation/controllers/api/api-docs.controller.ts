import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IsAdmin } from '../../../auth/guards/isAdmin.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('api-documentation')
@ApiTags('api-documentation')
export class ApiDocumentationController {
 
}
