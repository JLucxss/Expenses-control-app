import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ){}

    create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoriesRepository.create(createCategoryDto)
        return this.categoriesRepository.save(category)
    }

    findAll(): Promise<Category[]> {
        return this.categoriesRepository.find()
    }

    findOne(id: number): Promise<Category | null> {
        return this.categoriesRepository.findOne({ where: {id} })
    }

    async remove(id:number): Promise<void> {
        await this.categoriesRepository.delete(id)
    }
}
