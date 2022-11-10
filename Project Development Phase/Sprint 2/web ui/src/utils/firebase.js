import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth,signInWithPopup,
  GoogleAuthProvider,
  signOut } from "firebase/auth";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAwj027aqqtJWHMdmx27_uNeebFLKxvWRI",

  authDomain: "pill-remainder-d0d8a.firebaseapp.com",

  projectId: "pill-remainder-d0d8a",

  storageBucket: "pill-remainder-d0d8a.appspot.com",

  messagingSenderId: "87870620628",

  appId: "1:87870620628:web:f05b93cccec50acb7ecc41"

};

// Initialize Firebase
const singInWithGoogle = () => {
  console.log("signing in with google");
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

const logout = () => {
  console.log("loggin out");
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export {storage,db,auth,singInWithGoogle,logout}
export default app;