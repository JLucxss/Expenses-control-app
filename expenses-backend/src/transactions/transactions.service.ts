import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity/transaction.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';
import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
        private categoriesService: CategoriesService,
        private userService: UsersService,
    ){}

    async create(createTransactionsDto: CreateTransactionDto): Promise<Transaction> {
        const category = await this.categoriesService.findOne(createTransactionsDto.categoryId)
        if(!category) {
            throw new NotFoundException(`Category with ID ${createTransactionsDto.categoryId} not found`)
        }

        const user = await this.userService.findOneById(createTransactionsDto.userId)
        if(!user) {
            throw new NotFoundException(`User with Id ${createTransactionsDto.userId} not found`)
        }

        const transaction = this.transactionsRepository.create({
            ...createTransactionsDto,
            category,
            user
        })
        return this.transactionsRepository.save(transaction)
    }

    findAll(): Promise<Transaction[]> {
        return this.transactionsRepository.find({ relations: ['category', 'user']})
    }

    findOne(id: number): Promise<Transaction | null> {
        return this.transactionsRepository.findOne({ where: { id }, relations: ['category', 'user']})
    }

    async remove(id: number): Promise<void> {
        await this.transactionsRepository.delete(id)
    }
}
