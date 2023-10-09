import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs7bCCZQpSVXccouPmFp0Vuuz_A_70S8E",
  authDomain: "timba-77ffe.firebaseapp.com",
  projectId: "timba-77ffe",
  storageBucket: "timba-77ffe.appspot.com",
  messagingSenderId: "996156497975",
  appId: "1:996156497975:web:da9fa422aa2edf7221dfb2",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
