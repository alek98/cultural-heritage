import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import { chType } from './models/chType.model';
import { checkPermissions } from './permissions'

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

  // check if name of type is unique
  let chtypes = await admin.firestore()
    .collection('culturalHeritageTypes')
    .where('name', '==', chtype.name)
    .get();

  // if the document exists and doesn't have current id throw an error
  if (!chtypes.empty) {
    console.log('ids: ', chtype.id,  chtypes.docs[0].id);
    console.log('name: ', chtype.name);
    if(chtype.id !== chtypes.docs[0].id) {
      throw new functions.https.HttpsError(
        'already-exists',
        'cultural heritage type name must be unique'
      )
    }
  }

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

    // This is crucial to prevent infinite loops.
    // By returning null we prevent infinite loop.
    // Update only if name or description has changed.
    if(newValue.name == previousValue.name 
      && newValue.description == previousValue.description) {
        return null;
    }

    // get all cultural heritages with specific name
    const chs = await admin.firestore()
      .collection('culturalHeritages')
      .where('chtype.name', '==', previousValue.name)
      .get();

    // create batch 
    // batch is necessary when updating several documents in parallel
    let batch = admin.firestore().batch();

    chs.forEach(chDoc => {
      batch.update(chDoc.ref, { 'chtype': newValue })
    })

    // return write results
    return batch.commit();
})

export const deleteChtype = functions.https.onCall(async (chtype : chType, context) => {
  await checkPermissions(context);

  if (!chtype.id) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'id was empty'
    )
  }

  // if there are CHs containing this chtype, chtype cannot be deleted
  const chs = await admin.firestore()
    .collection('culturalHeritages')
    .where('chtype.name', '==', chtype.name)
    .get();
  if (!chs.empty) {
    throw new functions.https.HttpsError(
      'aborted',
      'chtype exists in cultural heritages.'
    )
  }

  // check if document exists with name and id combination
  // if not, somebody is sending modified object, throw an error
  const chtypeDocument = await admin.firestore()
    .collection('culturalHeritageTypes')
    .doc(chtype.id)
    .get();
  if(chtypeDocument.data()?.name !== chtype.name) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'name and id do not match.'
    )
  }

  return admin.firestore()
    .collection('culturalHeritageTypes')
    .doc(chtype.id)
    .delete();
})