import { Metadata, SerializableFile } from "@common"
import { servicesConfig } from "@config"
import { Injectable, OnModuleInit } from "@nestjs/common"
import {
    ClientProxy,
    ClientProxyFactory,
    Transport,
} from "@nestjs/microservices"
import { lastValueFrom } from "rxjs"

@Injectable()
export default class MpegDashConverterService implements OnModuleInit {
    private client: ClientProxy
    onModuleInit() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: servicesConfig().mpegDashConverter.host,
                port: Number(servicesConfig().mpegDashConverter.port),
            },
        })
    }

    async convert(videoFile: SerializableFile) {
        return await lastValueFrom(this.client.send<Metadata>("convert", videoFile))
    }
}
