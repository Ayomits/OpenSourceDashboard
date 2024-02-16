import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [

        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                type: "postgres",
                host: configService.getOrThrow("DB_HOST"),
                database: configService.getOrThrow("DB_NAME"),
                username: configService.getOrThrow("DB_USER"),
                password: configService.getOrThrow("DB_PASS"),
                port: Number(configService.getOrThrow("DB_PORT")),
                entities: [__dirname + "/**/*.entity{.ts,.js}"],
                autoLoadEntities: true,
                synchronize: true,
                migrationsRun: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}