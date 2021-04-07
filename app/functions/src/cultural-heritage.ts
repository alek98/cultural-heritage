import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import { CulturalHeritage } from './models/culturalHeritage.model';
import { User } from './models/user.model';


export const addNewCulturalHeritage = functions.https.onCall(async (ch: CulturalHeritage, context) => {
  await checkPermissions(context);

  // if authenticated as admin, add new cultural heritage
  return admin.firestore().collection('culturalHeritages').add(ch);
})

export const editCulturalHeritage = functions.https.onCall(async (ch: CulturalHeritage, context) => {
  await checkPermissions(context);
  
  if(!ch.id) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'id was empty'
    )
  }

  const chId = ch.id;
  delete ch.id; // avoid adding id into the db 

  return admin.firestore()
    .collection('culturalHeritages')
    .doc(chId)
    .update(ch);
})

export const deleteCulturalHeritage = functions.https.onCall(async (ch: CulturalHeritage, context) => {
  await checkPermissions(context);

  if(!ch.id) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'id was empty'
    )
  }

  return admin.firestore()
    .collection('culturalHeritages')
    .doc(ch.id)
    .delete();
})

async function checkPermissions(context: functions.https.CallableContext) {
  // if user is not authenticated, he/she must authenticate
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'must log in as admin'
    )
  }

  // only admin can edit cultural heritage type
  const snapshot = await admin.firestore()
    .collection('users')
    .doc(context.auth.uid)
    .get();
  const user: User = snapshot.data() as User;
  if (user.role !== 'admin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'not logged in as admin'
    )
  }
}