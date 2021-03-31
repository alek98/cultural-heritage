import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import { CulturalHeritage } from './models/culturalHeritage.model';
import { User } from './models/user.model';


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