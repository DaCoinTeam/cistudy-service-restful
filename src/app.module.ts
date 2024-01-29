import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { databaseConfig, jwtConfig, thirdPartyConfig } from "@config"
import { GlobalModule } from "@global"
import { ServicesModule } from "@services"
import { APP_FILTER } from "@nestjs/core"
import { GrpcServerExceptionFilter } from "nestjs-grpc-exceptions"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig, jwtConfig, thirdPartyConfig],
        }),

        TypeOrmModule.forRoot({
            type: "mysql",
            host: databaseConfig().mysql.host,
            port: +databaseConfig().mysql.port,
            username: databaseConfig().mysql.username,
            password: databaseConfig().mysql.password,
            database: databaseConfig().mysql.schema,
            autoLoadEntities: true,
            synchronize: true,
        }),

        GlobalModule,
        ServicesModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GrpcServerExceptionFilter,
        },
    ],
})
export class AppModule {}
