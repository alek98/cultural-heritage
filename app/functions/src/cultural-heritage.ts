import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import { CulturalHeritage } from './models/culturalHeritage.model';
import { checkPermissions } from './permissions'

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

