import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// curl -X POST http://localhost:5001/cultural-heritage-c8349/us-central1/getCollectionSize -d "name=reviews"
export const getCollectionSize = functions.https.onRequest(async (request, response) => {
  try {
    const name = request.body.name;

    const snapshot = await admin.firestore()
      .collection(name)
      .get();

    const size = snapshot.size;

    if (size === 0) {
      // if collection is not found, try finding a subcollection
      try {
        const snapshot = await admin.firestore()
          .collectionGroup(name)
          .get();

        const size = snapshot.size;

        if (size === 0) throw new Error("NotFound");

        let res = { name, size, }
        response.status(200).send(res);
      }
      catch (error) {
        throw error;
      }
    };

    let res = { name, size, }
    response.status(200).send(res);

  } catch (error) {
    if (error.message === "NotFound") {
      response.status(400).send(`Collection or subcollection with name ${request.body.name} does not exist.`)
    }
    else
      response.status(500).send()
  }
})