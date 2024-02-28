import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryCommandEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryCommandEntity) private categoryRepository: Repository<CategoryCommandEntity>,

  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existedCategory = await this.findByName(createCategoryDto.name)
    if (existedCategory) {
      throw new BadRequestException('This category already exists')
    }
    return await this.categoryRepository.save(this.categoryRepository.create(createCategoryDto))
  }

  async findAll() {
    return await this.categoryRepository.find({relations: ['commands']})
  }

  async findById(id: number) {
    const category = await this.categoryRepository.findOne({where: {id: id}, relations: ['commands']})
    return category
  }

  async findByName(name: string) {
    const category = await this.categoryRepository.findOne({where: {name: name}, relations: ['commands']})
    return category
  }

  async update(id: number, createCategoryDto: CreateCategoryDto) {
    const existedCategory = await this.findById(id)
    if (!existedCategory) {
      throw new BadRequestException("This category doesn't exists")
    }
    await this.categoryRepository.update(id, createCategoryDto)
    const newCategory = await this.findById(id)
    return {
      oldCategory: existedCategory,
      newCategory: newCategory
    }
  }

  async remove(id: number) {
    const existedCategory = await this.findById(id)
    if (!existedCategory) {
      throw new BadRequestException("This category doesn't exists")
    }
    
    return await this.categoryRepository.delete(id)
  }
}
