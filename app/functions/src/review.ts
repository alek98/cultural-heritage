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
      const rating = reviewDocSnapshot.get('rating') as number | undefined;
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
    const reviewData = review.data() as Review;
    reviewData.id = review.id;
    reviews.push(reviewData)
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

export const editReview = functions.https.onCall(async (review: Review, context) => {
  await checkRegularUserPermissions(context);
  if (!context.auth) return;

  if (!review.id) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'id was empty'
    )
  }

  return admin.firestore()
    .doc(`culturalHeritages/${review.chId}/reviews/${review.id}`)
    .update({
      content: review.content,
      rating: review.rating,
    })
})

/**
 * this function filters bad words that regular user wrote.
 * it finds bad words and replaces them with ****
 */
export const onWriteReview = functions.firestore
  .document('culturalHeritages/{chId}/reviews/{reviewId}')
  .onWrite(async (change) => {
    
    // review can be undefined if the document is being deleted
    const newValue = change.after.data() as Review | undefined;
    const oldValue = change.before.data() as Review | undefined;
    
    
    // If the document does not exist, it has been deleted.
    // Then there's no need to filter worlds
    if(!newValue) return null;
    // This is crucial to prevent infinite loops
    // Any time you write to the same document that triggered a function
    // By returning null we prevent infinite loop.
    if(newValue.content === oldValue?.content) return null;

    // filter bad words
    const Filter = await import('bad-words')
    const filter = new Filter({placeHolder: '*'});
    const filteredText = filter.clean(newValue.content);

    return change.after.ref.update({
      'content': filteredText
    })
  })