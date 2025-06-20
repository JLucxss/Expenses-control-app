import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>){}
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password_hash, 10);

        const user = this.usersRepository.create({
            ...createUserDto,
            password_hash: hashedPassword
        })

        return this.usersRepository.save(user);
    }

    async findOne(username: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { username }})
    }
}
