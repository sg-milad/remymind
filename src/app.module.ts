import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "./auth/auth.module"
import { RemymindModule } from "./remymind/remymind.module"
import { ConfigModule } from "@nestjs/config"
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
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "0.0.0.0",
      port: 8080,
      username: "postgres",
      password: "1234",
      database: "google_oauth2_app",
      synchronize: true,
      autoLoadEntities: true,
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
      // renderPath:"/api"
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
