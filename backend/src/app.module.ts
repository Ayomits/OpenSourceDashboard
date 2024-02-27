import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './modules/auth/auth.module'; // Auth without passport. It's discord api + jwt
import { CommandsModule } from './modules/CRUD/commands/commands.module';
import { LogSettingsModule } from './modules/CRUD/settings/log-settings/log-settings.module';
import { ModSettingsModule } from './modules/CRUD/settings/mod-settings/mod-settings.module';
import { CommandsGqlModule } from './modules/GraphQL/commands-gql/commands-gql.module';
import { LogSettingsGqlModule } from './modules/GraphQL//log-settings-gql/log-settings-gql.module';
import { ModSettingsGqlModule } from './modules/GraphQL/mod-settings-gql/mod-settings-gql.module';



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
        migrations: [__dirname + `/migrations/*.{.ts,.js}`],
        autoLoadEntities: true,
        synchronize: true,
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, 
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),

    AuthModule,
    CommandsModule,
    LogSettingsModule,
    ModSettingsModule,
    CommandsGqlModule,
    LogSettingsGqlModule,
    ModSettingsGqlModule
  ],
  providers: [],
})
export class AppModule {}
