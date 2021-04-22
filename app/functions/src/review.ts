import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Review } from './models/review.model'
import { checkRegularUserPermissions } from './permissions'
import { User } from './models/user.model'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'
import { CulturalHeritage } from './models/culturalHeritage.model'

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
    reviews.forEach(reviewDocSnapshot => {
      let rating = reviewDocSnapshot.get('rating') as number | undefined;
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


/**
 * @returns all users reviews with cultural heritage name
 * first  - check if user is logged in as regular user & get user ID
 * second - get all reviews which user has written
 * third  - find corresponding cultural heritage name for each review
 * 1. make a list of promises. Each promise is document snapshot from ch collection
 * 2. fetch promises in parallel
 * 3. wait for all promises to become resolved
 * 4. for each review find cultural heritage by id
 * 5. set review's property chName to found cultural heritage's name
 * 6. return list of reviews which also contain name of a found cultural heritage
 */
export const getUserReviews = functions.https.onCall(async (data, context) => {

  await checkRegularUserPermissions(context);
  if (!context.auth) return;
  const userId = context.auth.uid;

  const myReviewsSnapshot = await admin.firestore()
    .collectionGroup('reviews')
    .where('userId', '==', userId)
    .get();

  const reviews: Review[] = []
  myReviewsSnapshot.forEach(review => {
    reviews.push(review.data() as Review)
  })

  const promises: Promise<DocumentSnapshot>[] = []
  reviews.forEach(review => {
    const chPromise = admin.firestore()
      .collection('culturalHeritages')
      .doc(review.chId)
      .get()

    promises.push(chPromise);
  })

  const chSnapshots = await Promise.all(promises);

  reviews.forEach(review => {
    const chSnapshot = chSnapshots.find(chSnapshot => chSnapshot.id === review.chId);
    const ch = chSnapshot?.data() as CulturalHeritage;
    review.chName = ch.name;
  })

  return reviews;
})