import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryCommandEntity } from '../entities/category.entity';
import { Cache } from '@nestjs/cache-manager';


@Injectable()
export class CacheCategoriesService {
  private cacheTtl: number = 360_000;

  constructor(private cacheManager: Cache) {}

  async cacheFindCategoryById(id: number): Promise<CategoryCommandEntity | null> {
    return await this.cacheManager.get(`category-id-${id}`);
  }

  async cacheFindCategoryByName(name: string): Promise<CategoryCommandEntity | null> {
    return await this.cacheManager.get(`category-name-${name}`);
  }

  async cacheFindCategoryAll(): Promise<CategoryCommandEntity[] | null> {
    return await this.cacheManager.get(`categories-all`);
  }

  async cacheSave(key: string, value: any): Promise<void> {
    return await this.cacheManager.set(key, value, this.cacheTtl);
  }

  async cacheDelete(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryCommandEntity) private categoryRepository: Repository<CategoryCommandEntity>,
    private cacheService: CacheCategoriesService
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryCommandEntity> {
    const existedCategory = await this.findByName(createCategoryDto.name);
    if (existedCategory) {
      throw new BadRequestException('This category already exists');
    }
    return await this.categoryRepository.save(this.categoryRepository.create(createCategoryDto));
  }

  async findAll(): Promise<CategoryCommandEntity[]> {
    const categoriesInCache = await this.cacheService.cacheFindCategoryAll();
    if (categoriesInCache) {
      return categoriesInCache;
    }

    const categories = await this.categoryRepository.find({ relations: ['commands'] });
    if (categories) {
      await this.cacheService.cacheSave(`categories-all`, categories);
    }
    return categories;
  }

  async findById(id: number): Promise<CategoryCommandEntity> {
    const categoryInCache = await this.cacheService.cacheFindCategoryById(id);

    if (categoryInCache) {
      return categoryInCache;
    }

    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['commands'] });
    if (category) {
      await this.cacheService.cacheSave(`category-id-${id}`, category);
    }
    return category;
  }

  async findByName(name: string): Promise<CategoryCommandEntity> {
    const categoryInCache = await this.cacheService.cacheFindCategoryByName(name);

    if (categoryInCache) {
      return categoryInCache;
    }

    const category = await this.categoryRepository.findOne({ where: { name }, relations: ['commands'] });
    if (category) {
      await this.cacheService.cacheSave(`category-name-${name}`, category);
    }
    return category;
  }

  async update(id: number, createCategoryDto: CreateCategoryDto): Promise<{ oldCategory: CategoryCommandEntity, newCategory: CategoryCommandEntity }> {
    const existedCategory = await this.findById(id);
    if (!existedCategory) {
      throw new BadRequestException("This category doesn't exists");
    }
    await this.categoryRepository.update(id, createCategoryDto);
    const newCategory = await this.categoryRepository.findOne({ where: { id } });
    return {
      oldCategory: existedCategory,
      newCategory: newCategory
    };
  }

  async remove(id: number): Promise<void> {
    const existedCategory = await this.findById(id);
    if (!existedCategory) {
      throw new BadRequestException("This category doesn't exists");
    }

    await this.cacheService.cacheDelete(`category-id-${id}`);
    await this.cacheService.cacheDelete(`category-name-${existedCategory.name}`);

    await this.categoryRepository.delete(id);
  }
}

