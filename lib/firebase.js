// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "@/keys";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
auth.useDeviceLanguage();
const storage = getStorage(app);

const getFreshToken = async () => {
    const user = auth.currentUser;
    if (user) {
        return await user.getIdToken(/* forceRefresh */ true);
    }
    return null;
};

export {
    app,
    auth,
    db,
    storage,
    getFreshToken
}

