import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBWeKYC1NC3oVmCJcT_nS2yLvG2JSBf01w",
    authDomain: "clientes-web-mobile-63023.firebaseapp.com",
    projectId: "clientes-web-mobile-63023",
    storageBucket: "clientes-web-mobile-63023.appspot.com",
    messagingSenderId: "543420306001",
    appId: "1:543420306001:web:b708fcec9437dbb20d5e70",
}

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)

export default {
    app,
    db,
    auth,
}
