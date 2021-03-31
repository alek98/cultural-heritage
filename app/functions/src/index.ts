import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import { CulturalHeritage } from "./models/culturalHeritage.model";
import { User } from "./models/user.model";
import { chType } from "./models/chType.model";
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const onNewUserSignup = functions.auth.user().onCreate(user => {
  let role: string;
  if (user.email === 'admin@gmail.com') {
    role = 'admin';
  }
  else {
    role = 'user';
  }
  return admin.firestore().collection('users').doc(user.uid).set({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    role: role,
  })
})

export const addNewCulturalHeritage = functions.https.onCall(async (ch: CulturalHeritage, context) => {

  // if user is not authenticated, he/she must authenticate
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'must log in as admin'
    )
  }

  // only admin can add new cultural heritage
  const snapshot = await admin.firestore().collection('users').doc(context.auth.uid).get();
  const user: User = snapshot.data() as User;
  if (user.role !== 'admin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'not logged in as admin'
    )
  }

  // if authenticated as admin, add new cultural heritage
  return admin.firestore().collection('culturalHeritages').add(ch);
})

export const addNewChtype = functions.https.onCall(async (chtype: chType, context) => {

  // if user is not authenticated, he/she must authenticate
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'must log in as admin'
    )
  }

  // only admin can add new cultural heritage
  const snapshot = await admin.firestore().collection('users').doc(context.auth.uid).get();
  const user: User = snapshot.data() as User;
  if (user.role !== 'admin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'not logged in as admin'
    )
  }

  return admin.firestore().collection('culturalHeritageTypes').add(chtype);
})