import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../../typeorm/entities/User"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { GoogleStrategy } from "./utils/GoogleStrategy"
import { SessionSerializer } from "./utils/Serializer"
import { UserService } from "../user/user.service"

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService,
    },
    {
      provide: "USER_SERVICE",
      useClass: UserService,
    },
  ],
})
export class AuthModule {}
