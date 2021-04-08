import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';

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