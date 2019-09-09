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

export const createUserProfileDocument = async (userAuth, addtionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addtionalData
      })
    } catch (error) {
      console.log('Error', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;