import { Module } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/transactions/entities/transaction.entity/transaction.entity';
import { SummariesController } from './summaries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [SummariesService],
  controllers: [SummariesController]
})
export class SummariesModule {}
