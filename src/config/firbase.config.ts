import { ConfigFactory, registerAs } from "@nestjs/config"
import { AppOptions } from "firebase-admin"
// import { cert } from "firebase-admin/app"

export default registerAs<AppOptions, ConfigFactory<AppOptions>>(
  "firebase",
  async () => {
    if (!process.env.FIREBASE_CER) {
      throw new Error("Firebase CERT  has been required.")
    }

    return {
    }
  }
)
