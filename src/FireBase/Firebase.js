// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCwK_5iCbza0QOQpUsYDZt0vBA2jDNImds",
  authDomain: "e-commece-6665f.firebaseapp.com",
  projectId: "e-commece-6665f",
  storageBucket: "e-commece-6665f.appspot.com",
  messagingSenderId: "13577255253",
  appId: "1:13577255253:web:0d1d7dae43501c0b8e97dc",
  measurementId: "G-EQMWDTDL4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export default app