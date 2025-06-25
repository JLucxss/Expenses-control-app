import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto/create-category.dto';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}

    @Post()
    create(@Body() createCategoryDto:CreateCategoryDto){
        return this.categoryService.create(createCategoryDto)
    }

    @Get()
    findAll() {
        return this.categoryService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(+id)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoryService.remove(+id)
    }
}
