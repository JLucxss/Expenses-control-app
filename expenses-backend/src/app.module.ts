import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity/category.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/entities/transaction.entity/transaction.entity';
import { SummariesModule } from './summaries/summaries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '88439316ce',
      database: 'expenses_db',
      entities: [User, Category, Transaction],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    TransactionsModule,
    SummariesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
