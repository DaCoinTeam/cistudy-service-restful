import { Global, Module } from "@nestjs/common"
import { MailerService, Sha256Service, AuthManagerService } from "./base"
import { FirebaseService } from "./3rd"
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
        AuthManagerService,
        JwtService,
    ],
    providers: [
    //3rd
        FirebaseService,
        MailerService,

        //base
        Sha256Service,
        AuthManagerService,
        JwtService,
    ],
})
export default class GlobalServicesModule {}
