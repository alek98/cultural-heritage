import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { News } from './models/news.model'
import { checkPermissions } from './permissions'

export const addNews = functions.https.onCall(async (news: News, context) => {
  await checkPermissions(context);
  
  return admin.firestore()
    .collection('news')
    .add({
    ...news,
    lastModifiedAt: admin.firestore.FieldValue.serverTimestamp()
  });
})

export const editNews = functions.https.onCall(async (news: News, context) => {
  await checkPermissions(context);

  if (!news.id) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'id was empty'
    )
  }

  const newsId = news.id;
  delete news.id;

  return admin.firestore()
    .collection('news')
    .doc(newsId)
    .update({
      ...news,
      lastModifiedAt: admin.firestore.FieldValue.serverTimestamp()
    });
})