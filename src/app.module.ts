import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { databaseConfig, jwtConfig, thirdPartyConfig } from "@config"
import { GlobalServicesModule } from "@global"
import { AuthModule } from "@features"

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

        //global
        GlobalServicesModule,

        //features
        AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
