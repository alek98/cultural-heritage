import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
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