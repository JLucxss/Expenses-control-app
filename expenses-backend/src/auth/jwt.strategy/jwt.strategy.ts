import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from "passport-jwt"
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'JL085',
        })
    }

    async validate(payload: JwtPayload) {
        const user = await this.usersService.findOne(payload.username);
        if(!user) {
            throw new UnauthorizedException();
        }

        return user
    }
}