import { Controller, NotFoundException } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import { SignInInput } from "./interfaces"
import { UserMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Controller()
export class AuthService  {
    constructor(
        @InjectRepository(UserMySqlEntity)
        private readonly userMySqlRepository: Repository<UserMySqlEntity>
    ){

    }
    @GrpcMethod()
    async signIn(data: SignInInput): Promise<UserMySqlEntity> {
        const found = await this.userMySqlRepository.findOneBy({
            email: data.email,
        })
        if (!found) throw new NotFoundException("User not found.")
        if (!this.sha256Service.verifyHash(body.password, found.password))
            throw new UnauthorizedException("Invalid credentials.")
        return found
    }
}