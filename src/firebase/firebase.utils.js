import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDZ4BWY7gBgFFjfMvGhQHhHimqImIpu2D4",
    authDomain: "crwn-db-d822e.firebaseapp.com",
    projectId: "crwn-db-d822e",
    storageBucket: "crwn-db-d822e.appspot.com",
    messagingSenderId: "224751029245",
    appId: "1:224751029245:web:4a35f9ed3cba68d96c2794",
    measurementId: "G-Y3TG4XQGQL"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exsists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
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