import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import { User } from './models/user.model';
import { chType } from './models/chType.model';

export const addNewChtype = functions.https.onCall(async (chtype: chType, context) => {
  await checkPermissions(context);

  // lower case name and description
  chtype.name = chtype.name.toLowerCase();
  chtype.description = chtype.description.toLowerCase();

  // check if name of type is unique
  let chtypes = await admin.firestore()
    .collection('culturalHeritageTypes')
    .where('name', '==', chtype.name)
    .get();
  if (!chtypes.empty) {
    throw new functions.https.HttpsError(
      'already-exists',
      'cultural heritage type name must be unique'
    )
  }

  return admin.firestore().collection('culturalHeritageTypes').add(chtype);
})


export const editChtype = functions.https.onCall(async (chtype: chType, context) => {
  await checkPermissions(context);

  if (!chtype.id) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'id was empty'
    )
  }

  // lower case name and description
  chtype.name = chtype.name.toLowerCase();
  chtype.description = chtype.description.toLowerCase();


  return admin.firestore()
    .collection('culturalHeritageTypes')
    .doc(chtype.id)
    .update({
      'name': chtype.name,
      'description': chtype.description
    })
})

export const onEditChtype = functions.firestore
  .document('culturalHeritageTypes/{docId}')
  .onUpdate(async (change, context) => {
    const previousValue = change.before.data() as chType;
    const newValue = change.after.data() as chType;

    // get all cultural heritages with specific name
    const chs = await admin.firestore()
      .collection('culturalHeritages')
      .where('chtype.name', '==', previousValue.name)
      .get();
    
    // create batch 
    // batch is necessary when updating several documents in parallel
    let batch = admin.firestore().batch();

    chs.forEach( chDoc => {
      batch.update(chDoc.ref, {'chtype' : newValue})
    })

    // return write results
    return batch.commit();
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