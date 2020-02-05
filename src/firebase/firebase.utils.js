import firebase from "firebase/app";

// These imports load individual services into the firebase namespace.
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0mzdNi-12FFYSHnq5UxtyVKxsZioKD0c",
  authDomain: "crwn-db-aac96.firebaseapp.com",
  databaseURL: "https://crwn-db-aac96.firebaseio.com",
  projectId: "crwn-db-aac96",
  storageBucket: "crwn-db-aac96.appspot.com",
  messagingSenderId: "666228540405",
  appId: "1:666228540405:web:1d35aee2101a405408d6bc",
  measurementId: "G-VY2WVRR62V"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = await firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user ", error.message);
    }
  }

  return userRef;
};

export default firebase;
