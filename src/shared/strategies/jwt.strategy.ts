import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConfig } from "@config"
import { UserMySqlEntity } from "@database"
import { Injectable } from "@nestjs/common"
import { Payload, ValidatedResult } from "../interfaces"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
    @InjectRepository(UserMySqlEntity)
    private readonly userMySqlRepository: Repository<UserMySqlEntity>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig().secret,
        })
    }

    async validate(payload: Payload): Promise<ValidatedResult> {
        const user = await this.userMySqlRepository.findOneBy({
            userId: payload.userId,
        })
        return {
            user,
            type: payload.type,
        }
    }
}
