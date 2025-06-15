import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string

    @Column()
    password_hash: string

    @Column({default: false})
    is_admin: boolean
}