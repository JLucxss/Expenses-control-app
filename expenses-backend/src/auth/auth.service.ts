import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { JwtPayload } from './jwt.strategy/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private JwtService: JwtService,
    ){}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        
        if(user && (await bcrypt.compare(pass, user.password_hash))) {
            const { password_hash, ...result } = user
            return result
        }

        return null
    }

    async login(user: JwtPayload) {
        const payload = { username: user.username, sub: user.sub}
        return {
            access_token: this.JwtService.sign(payload)
        }
    }
}
