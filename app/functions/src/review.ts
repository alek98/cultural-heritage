import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Review } from './models/review.model'
import { checkRegularUserPermissions } from './permissions'
import { User } from './models/user.model'

export const addNewReview = functions.https.onCall(async (review: Review, context) => {
  await checkRegularUserPermissions(context);
  if (!context.auth) return;

  // set user display name
  const snapshot = await admin.firestore()
    .collection('users')
    .doc(context.auth.uid)
    .get();
  const user: User = snapshot.data() as User;
  review.userDisplayName = user.displayName || 'unknown user';
  review.userId = user.uid;

  // save to firestore
  return admin.firestore()
    .collection(`culturalHeritages/${review.chId}/reviews`)
    .add({
      ...review,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })
})