import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcPmqEg4aWfv-l-detRJttIyAA6jVmpIc",
  authDomain: "avery-build1.firebaseapp.com",
  projectId: "avery-build1",
  storageBucket: "avery-build1.appspot.com",
  messagingSenderId: "781699047289",
  appId: "1:781699047289:web:e523319306329d0b8ad9a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth (app)

export {app, auth}