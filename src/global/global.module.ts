import { Global, Module } from "@nestjs/common"
import { FirebaseService, MailerService, Sha256Service } from "./services"
import { JwtService } from "@nestjs/jwt"
import { SessionMySqlEntity } from "@database"
import { TypeOrmModule } from "@nestjs/typeorm"

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([SessionMySqlEntity])],
    exports: [
    //3rd
        FirebaseService,
        MailerService,

        //base
        Sha256Service,
        JwtService,
    ],
    providers: [
    //3rd
        FirebaseService,
        MailerService,

        //base
        Sha256Service,
        JwtService,
    ],
})
export default class GlobalModule {}
