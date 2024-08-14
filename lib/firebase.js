// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCE7_gYf1UZ-KgfRS45xPKYkAy0S5GxYbk",
    authDomain: "mymedicosupdated.firebaseapp.com",
    databaseURL: "https://mymedicosupdated-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mymedicosupdated",
    storageBucket: "mymedicosupdated.appspot.com",
    messagingSenderId: "968103235749",
    appId: "1:968103235749:web:4d70d83c4fc0b751edbd4c",
    measurementId: "G-44QCB58BZM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
auth.useDeviceLanguage();

export {
    app,
    auth,
    db
}

