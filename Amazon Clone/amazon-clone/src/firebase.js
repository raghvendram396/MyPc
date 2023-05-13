// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBDzSP25nqSjTilY4gMc8ELw8Rd4qlrMH8",
    authDomain: "challenge-16684.firebaseapp.com",
    projectId: "challenge-16684",
    storageBucket: "challenge-16684.appspot.com",
    messagingSenderId: "803980992274",
    appId: "1:803980992274:web:09e78897ac5989a22a1dcb",
    measurementId: "G-ZTGYCLKFNS"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export {db, auth};