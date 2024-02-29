import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommandDto } from './dto/command/create-command.dto';
import { CategoryService } from './services/category.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandEntity } from './entities/command.entity';
import { Repository } from 'typeorm';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class CommandsService {
  ttl: number = 360_000

  constructor(
    private readonly categoryService: CategoryService,
    @InjectRepository(CommandEntity) private commandRepository: Repository<CommandEntity>,
    private cacheManager: Cache
  ) {}

  async create(createCommandDto: CreateCommandDto) {
    const existedCommand = await this.commandRepository.findOne({ where: { name: createCommandDto.name } })
    if (existedCommand) {
      throw new BadRequestException(`This command already exists`)
    }
    const category = await this.categoryService.findById(createCommandDto.categoryID)
    if (!category) {
      throw new BadRequestException(`Category with this id doesn't exist`)
    }
    const query = await this.commandRepository.create({ ...createCommandDto, category: category })
  
    const createdCommand = await this.commandRepository.save(query);
    await this.cacheManager.del(`commands-all`);
  
    return createdCommand;
  }

  async findAll() {
    const cachedCommands = await this.cacheManager.get(`commands-all`);
    if (cachedCommands) {
      return cachedCommands;
    }

    const commands = await this.commandRepository.find({ relations: ['category'] });
    await this.cacheManager.set(`commands-all`, commands, );

    return commands;
  }

  async findById(id: number) {
    const cachedCommand = await this.cacheManager.get(`command-id-${id}`);
    if (cachedCommand) {
      return cachedCommand;
    }

    const command = await this.commandRepository.findOne({ where: { id }, relations: ['category'] });
    await this.cacheManager.set(`command-id-${id}`, command, this.ttl);

    return command;
  }

  async findByCategory(categoryID: number) {
    const category = await this.categoryService.findById(categoryID);
    if (!category) {
      throw new BadRequestException(`Category with this id doesn't exist`);
    }

    const cachedCommand = await this.cacheManager.get(`command-category-${categoryID}`);
    if (cachedCommand) {
      return cachedCommand;
    }

    const command = await this.commandRepository.findOne({ where: { category }, relations: ['category'] });
    await this.cacheManager.set(`command-category-${categoryID}`, command, this.ttl);

    return command;
  }

  async update(id: number, updateCommandDto: CreateCommandDto) {
    const existedCommand = await this.findById(id)
    if (!existedCommand){
      throw new BadRequestException(`This command doesn't exist`)
    }
    const category = await this.categoryService.findById(updateCommandDto.categoryID)
    if (!category) {
      throw new BadRequestException(`Category with this id doesn't exist`)
    }
    await this.commandRepository.update(id, {
      name: updateCommandDto.name,
      description: updateCommandDto.description,
      aliases: updateCommandDto.aliases,
      category: category
    })

    await this.cacheManager.del(`command-id-${id}`);

    const newCommand = await this.findById(id);
    return {
      oldCommand: existedCommand,
      newCommand: newCommand
    }
  }

  async remove(id: number) {
    const existedCommand = await this.findById(id)
    if (!existedCommand){
      throw new BadRequestException(`This command doesn't exist`)
    }

    await this.cacheManager.del(`command-id-${id}`);
    return await this.commandRepository.delete(id);
  }
}