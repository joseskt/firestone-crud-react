import firebase from 'firebase/app';
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAw0GT_biXrqXNCru0mgLFSW0YFfLCsnEI",
    authDomain: "crud-react-jose.firebaseapp.com",
    projectId: "crud-react-jose",
    storageBucket: "crud-react-jose.appspot.com",
    messagingSenderId: "858892405193",
    appId: "1:858892405193:web:c3b31fb38550f806208018"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();