import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Work with UserEntity and getting some data from 

@Controller('users')
@ApiTags('users')
export class UserController {

  @Get('guilddata')
  findGuildData() {} // only admins or owner servers

}
