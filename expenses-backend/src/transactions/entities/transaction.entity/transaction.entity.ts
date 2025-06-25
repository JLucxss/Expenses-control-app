import { Category } from "src/categories/entities/category.entity/category.entity";
import { User } from "src/users/entities/user.entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    type: string; // should be 'income' or 'expense'

    @ManyToOne(() => Category, category => category.id)
    category: Category;

    @ManyToOne(() => User, user => user.id)
    user: User
}
