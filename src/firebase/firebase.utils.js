import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyADiL9GM131ZYWFnhkpAPAOAb14Ei7nrG4",
  authDomain: "crwn-db-42c04.firebaseapp.com",
  databaseURL: "https://crwn-db-42c04.firebaseio.com",
  projectId: "crwn-db-42c04",
  storageBucket: "",
  messagingSenderId: "538840542412",
  appId: "1:538840542412:web:32142354cde5f69df32669"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;