
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBD41QEuLxwHT7WIt5bK1H1pB4CA7rNbDQ",
  authDomain: "olx-clone-20302.firebaseapp.com",
  projectId: "olx-clone-20302",
  storageBucket: "olx-clone-20302.appspot.com",
  messagingSenderId: "875098941703",
  appId: "1:875098941703:web:005b1390a3b09cca613da2",
  measurementId: "G-9THFCDY4RJ"
};


const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase)
const auth = getAuth();
const storage = getStorage(firebase)

export {
    firebase,
    auth,
    firestore,
    storage
}
