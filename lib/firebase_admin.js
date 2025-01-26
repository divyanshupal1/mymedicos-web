import admin from 'firebase-admin';
import { firebase_admin_keys } from '@/keys';

// Initialize Firebase Admin only if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebase_admin_keys),
    databaseURL: "https://mymedicosupdated-default-rtdb.asia-southeast1.firebasedatabase.app",
  });
}

export default admin;
