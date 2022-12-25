import {   CacheModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RemymindModule } from './remymind/remymind.module';
import { ConfigModule  } from '@nestjs/config';
import configuration from './config/configuration';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal:true,
      load:[configuration]
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      port: 8080,
      username: 'postgres',
      password: '1234',
      database: 'google_oauth2_app',
      synchronize: true,
      autoLoadEntities:true
    }),
    PassportModule.register({ session: true }),
    RemymindModule,
    CacheModule.register({
      store: redisStore,
      isGlobal:true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
