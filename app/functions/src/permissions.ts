import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { User } from './models/user.model';

export async function checkPermissions(context: functions.https.CallableContext) {
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

export async function checkRegularUserPermissions(context: functions.https.CallableContext) {
    // if user is not authenticated, he/she must authenticate
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'you must log in.'
      )
    }
  
    // check if logged in as regular user (by role)
    const snapshot = await admin.firestore()
      .collection('users')
      .doc(context.auth.uid)
      .get();
    const user: User = snapshot.data() as User;
    if (user.role !== 'user') {
      throw new functions.https.HttpsError(
        'permission-denied',
        'not logged in as user'
      )
    }
}