import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "./modules/auth/auth.module"
import { RemymindModule } from "./modules/remymind/remymind.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import configuration from "./config/configuration"
import { redisStore } from "cache-manager-redis-store"
import { LoggerMiddleware } from "./middleware/logger.middleware"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import firbaseConfig from "./config/firbase.config"

@Module({
  imports: [
    // NotificationsService,
    ConfigModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [configuration, firbaseConfig],
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.name"),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),

    PassportModule.register({ session: true }),
    RemymindModule,
    CacheModule.register({
      store: redisStore,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "upload"),
      serveRoot: "/upload",
    }),
  ],
  controllers: [],
  providers: [
    // NotificationsService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
