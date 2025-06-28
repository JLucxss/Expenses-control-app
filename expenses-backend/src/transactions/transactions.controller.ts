import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionsService.create({ ...createTransactionDto, userId: req.user.id})
    }

    @Get()
    findAll(@Request() req) {
        return this.transactionsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionsService.findOne(+id)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.transactionsService.remove(+id)
    }
}
