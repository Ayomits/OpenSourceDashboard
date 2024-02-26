import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommandDto } from './dto/command/create-command.dto';
import { CategoryService } from './services/category.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandEntity } from './entities/command.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CommandsService {
  constructor(
      private readonly categoryService: CategoryService,
      @InjectRepository(CommandEntity) private commandRepository: Repository<CommandEntity>
    ) {}

  async create(createCommandDto: CreateCommandDto) {
    const existedCommand = await this.commandRepository.findOne({where: {name: createCommandDto.name}})
    if (existedCommand) {
      throw new BadRequestException(`This command already exists`)
    }
    const category = await this.categoryService.findOne(createCommandDto.categoryID)
    if (!category) {
      throw new BadRequestException(`Category with this name doesn't exist`)
    }
    const query = await this.commandRepository.create({...createCommandDto, category: category})

    return await this.commandRepository.save(query)
  }

  async findAll() {
    return this.commandRepository.find({relations: ['category']})
  }

  async findOne(id: number) {
    return this.commandRepository.findOne({where: { id } ,relations: ['category']})
  }

  async update(id: number, updateCommandDto: CreateCommandDto) {
    const existedCommand = await this.findOne(id)
    if (!existedCommand){
      throw new BadRequestException(`This command doesn't exist`)
    }
    const category = await this.categoryService.findOne(updateCommandDto.categoryID)
    if (!category) {
      throw new BadRequestException(`Category with this id doesn't exist`)
    }
    await this.commandRepository.update(id, {
      name: updateCommandDto.name,
      description: updateCommandDto.description,
      aliases: updateCommandDto.aliases,
      category: category
    })
    const newCommand = await this.findOne(id)
    return {
      oldCommand: existedCommand,
      newCommand: newCommand
    }
  }

  async remove(id: number) {
    const existedCommand = await this.findOne(id)
    if (!existedCommand){
      throw new BadRequestException(`This command doesn't exist`)
    }
    return await this.commandRepository.delete(id)
  }
}
