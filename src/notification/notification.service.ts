import * as admin from "firebase-admin"

import { Inject, Injectable } from "@nestjs/common"
import { ConfigType } from "@nestjs/config"
import firbaseConfig from "src/config/firbase.config"

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(firbaseConfig.KEY)
    private readonly fbConfig: ConfigType<typeof firbaseConfig>
  ) {
    // admin.initializeApp({
    //   credential: admin.credential.cert({
    //     projectId: "",
    //     clientEmail: "",
    //     privateKey: "",
    //   }),
    // })
  }

  async sendNotification(token: string, title: string, body: string) {
    const message = {
      notification: {
        title,
        body,
      },
      token,
    }
    return admin.messaging().send(message)
  }
}
