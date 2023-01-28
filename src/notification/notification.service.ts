import * as admin from 'firebase-admin';

import { Inject, Injectable } from "@nestjs/common"
import { ConfigType } from "@nestjs/config"
import firbaseConfig from "src/config/firbase.config"

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(firbaseConfig.KEY)
    private readonly fbConfig: ConfigType<typeof firbaseConfig>
  ) {
    // console.log(fbConfig);
    try {
      // firebase.initializeApp({

      //   // databaseURL:"localhost:3000",
      //   credential: firebase.credential.cert(
      //   {
          
      //     },
      //   ),
      // },"notify")
      admin.initializeApp({
  credential: admin.credential.cert({
    projectId: '',
    clientEmail:"",
    privateKey:
  ""
  }),
});
      
    } 
    catch (error) {
      console.log(error);
    }
     
  }

  async sendNotification(token: string, title: string, body: string) {
    const message = {
      notification: {
        title,
        body
      },
      token
    };
    return admin.messaging().send(message);
  }

}
