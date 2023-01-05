import { Inject, Injectable } from "@nestjs/common"
import { ConfigType } from "@nestjs/config"
import * as firebase from "firebase-admin"
import firbaseConfig from "src/config/firbase.config"

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(firbaseConfig.KEY)
    private readonly fbConfig: ConfigType<typeof firbaseConfig>
  ) {
    // console.log(fbConfig);

    firebase.initializeApp({
      credential: firebase.credential.cert(fbConfig),
    })
  }
}
