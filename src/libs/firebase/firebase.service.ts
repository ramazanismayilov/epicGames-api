import { Injectable } from "@nestjs/common";
import admin from 'firebase-admin';
const privateKey = require('../../../keys/firebase-private.json');

@Injectable()
export class FirebaseService {
    public firebaseApp: admin.app.App;

    constructor() {
        this.firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(privateKey),
        });
    }
}