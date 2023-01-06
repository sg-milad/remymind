import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { Request } from "express"
import { CurrentUser } from "src/common/decorator/current-user.decorator"
import { GoogleAuthGuard } from "./utils/Guards"

@Controller("auth")
export class AuthController {
  @Get("google/login")
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: "Google Authentication" }
  }
  // api/auth/google/redirect
  @Get("google/redirect")
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: "OK" }
  }

  @Get("status")
  user(@Req() request: Request ,@CurrentUser() user ) {
    console.log(user);
    
    if (request.user) {
      return { msg: "Authenticated" }
    } else {
      return { msg: "Not Authenticated" }
    }
  }
}
