import { Inject, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Profile, Strategy } from "passport-google-oauth20"
import { UserService } from "../../user/user.service"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: UserService,
    private configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>("google.client_id"),
      clientSecret: configService.get<string>("google.client_secrt"),
      callbackURL: configService.get<string>("google.call_back_url"),
      scope: ["profile", "email"],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(profile)

    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    })
    return user || null
  }
}
