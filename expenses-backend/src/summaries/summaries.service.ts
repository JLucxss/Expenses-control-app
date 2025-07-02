import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { Transaction } from 'src/transactions/entities/transaction.entity/transaction.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class SummariesService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>
    ){}

    async getWeeklySummary(userId: number): Promise<any> {
        const now = new Date();
        const start = startOfWeek(now, { weekStartsOn: 0}) // domingo como início da semana
        const end = endOfWeek(now, { weekStartsOn: 0})

        const transactions = await this.transactionsRepository.find({
            where: {
                user: { id: userId},
                date: Between(start, end)
            },
            relations: ['categories'],
        })

        const summary = {
            income: 0,
            expense: 0,
            balance: 0,
            transactionsByCategory: {}
        }

        transactions.forEach(transaction => {
            if(transaction.type === 'income') {
                summary.income += transaction.value
            } else {
                summary.expense += transaction.value;
            }

            if(!summary.transactionsByCategory[transaction.category.name]) {
                transaction[transaction.category.name] = 0
            }
            summary.transactionsByCategory[transaction.category.name] += transaction.value
        })

        summary.balance = summary.income - summary.expense

        return summary
    }

    async getMonthlySummaries(userId: number): Promise<any> {
        const now = new Date()
        const start = startOfMonth(now)
        const end = endOfMonth(now)

        const transactions = await this.transactionsRepository.find({
            where: {
                id: userId,
                date: Between(start, end)
            },
            relations: ['categories']
        })

        const summary = {
            income: 0,
            expense: 0,
            balance: 0,
            transactionsByCategory: {}
        }

        transactions.forEach(transaction => {
            if(transaction.type === 'income') {
                summary.income += transaction.value
            } else {
                summary.expense += transaction.value
            }

            if(!summary.transactionsByCategory[transaction.category.name]) {
                summary.transactionsByCategory[transaction.category.name] = 0
            }

            summary.transactionsByCategory[transaction.category.name] += transaction.value

        })
        
        summary.balance = summary.income - summary.expense

        return summary
    }

}
