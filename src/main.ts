import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as session from "express-session"
import * as passport from "passport"
import { ValidationPipe } from "@nestjs/common"
import * as cookieParser from "cookie-parser"
import * as connectRedis from "connect-redis"
import { NestExpressApplication } from "@nestjs/platform-express"
import { redisClient } from "./utils/redis"

const RedisStore = connectRedis(session)

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ["error", "warn", "log"],
  })
  app.setGlobalPrefix("api")
  app.use(cookieParser())

  app.use(
    session({
      name: "remymind",
      secret: "asiodasjoddjdoasddasoidjasiodasdjaiodd",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000000000000,
      },
      store: new RedisStore({ client: redisClient }),
    })
  )
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3001)
}
bootstrap()
