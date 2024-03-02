import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./modules/auth/auth.module"; // Auth without passport. It's discord api + jwt
import { CommandsModule } from "./modules/CRUD/commands/commands.module";
import { LogSettingsModule } from "./modules/CRUD/settings/log-settings/log-settings.module";
import { ModSettingsModule } from "./modules/CRUD/settings/mod-settings/mod-settings.module";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CustomCacheInterceptor } from "./interceptors/cache.interceptors";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
        migrations: [__dirname + `/migrations/*.{.ts,.js}`],
        autoLoadEntities: true,
        synchronize: true,
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),

    CacheModule.register({
      isGlobal: true,

    }),

    AuthModule,
    CommandsModule,
    LogSettingsModule,
    ModSettingsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomCacheInterceptor,
    },
  ],
})
export class AppModule {}
