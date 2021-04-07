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
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
})