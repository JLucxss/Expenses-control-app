import { IsDateString, IsIn, IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
    @IsNumber()
    value: number;

    @IsString()
    description: string;

    @IsDateString()
    date: Date;

    @IsString()
    @IsIn(["income", "expenses"])
    type: string;

    @IsNumber()
    categoryId: number;

    @IsNumber()
    userId: number;


}
