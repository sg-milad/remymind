import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

@Injectable()
export class NotificationsService {
  constructor() {
    // For simplicity these credentials are just stored in the environment
    // However these should be stored in a key management system
    const firebaseCredentials = JSON.parse(process.env.FIREBASE_CER);
    firebase.initializeApp({
      credential: firebase.credential.cert(firebaseCredentials),
    //   databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
}