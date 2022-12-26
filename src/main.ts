import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import {createClient} from "redis"
import * as connectRedis from 'connect-redis';
import { NestExpressApplication } from '@nestjs/platform-express';

let RedisStore = connectRedis(session);
let redisClient = createClient({
  url:"redis://default:redispw@localhost:55002"
})
redisClient.on('error', (err) => console.log('Redis Client Error', err));

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    logger:['error','warn','log']
  });
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  app.use(
    session({
      name: 'remymind',
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000000000000,
      },
      store: new RedisStore({ client: redisClient }),
    }),
  );
  app.useGlobalPipes(new ValidationPipe({transform:true}));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3001);
}
bootstrap();
