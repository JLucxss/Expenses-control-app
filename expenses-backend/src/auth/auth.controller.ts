import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ){}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Post('login')
    async login(@Body() body: {username: string, password: string}){
        const user = await this.authService.validateUser(body.username, body.password)

        if(!user) {
            throw new UnauthorizedException('Credenciais inválidas')
        }

        return this.authService.login({
            username: user.username,
            sub: user.id
        })
    }
}
