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

// when new review is added, recalculate avarage rating for the specific Cultural Heritage
export const onAddNewReview = functions.firestore
  .document('culturalHeritages/{chId}/reviews/{reviewId}')
  .onWrite(async (change, context) => {

    //get all reviews
    const reviews = await admin.firestore()
      .collection(`culturalHeritages/${context.params.chId}/reviews`)
      .get();

    let ratingsSum = 0;
    let ratingsTotal = 0;
    reviews.forEach(reviewDoc => {
      let rating = reviewDoc.get('rating') as number | undefined;
      if (rating) {
        ratingsSum += rating;
        ratingsTotal++;
      }
    })

    const avgRating = parseFloat((ratingsSum / ratingsTotal).toFixed(1));

    return admin.firestore()
      .collection('culturalHeritages')
      .doc(context.params.chId)
      .update({
        avgRating
      });
  })