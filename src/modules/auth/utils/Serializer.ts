/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from "@nestjs/common"
import { PassportSerializer } from "@nestjs/passport"
import { User } from "../../../typeorm/entities/User"
import { AuthService } from "../auth.service"

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: AuthService
  ) {
    super()
  }

  serializeUser(user: User, done: Function) {
    done(null, user)
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.findUser(payload.id)
    return user ? done(null, user) : done(null, null)
  }
}
