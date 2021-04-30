import * as functions from 'firebase-functions'

import { PubSub } from '@google-cloud/pubsub'
const pubsub = new PubSub()

interface PubSubData {
  "budgetDisplayName": string,
  "alertThresholdExceeded": number,
  "costAmount": string,
  "costIntervalStart": string,
  "budgetAmount": number,
  "budgetAmountType": string,
  "currencyCode": "USD"
}

// curl http://localhost:5001/cultural-heritage-c8349/us-central1/mockPublishBillingMessage
export const mockPublishBillingMessage = functions.https.onRequest(async (req, res) => {
  // use only when testing locally
  const isEmulated = process.env.FUNCTIONS_EMULATOR;
  if (!isEmulated) return;

  const msg = await pubsub.topic('my-budget-alert').publishJSON({
    "budgetDisplayName": "name-of-budget",
    "alertThresholdExceeded": 1.0,
    "costAmount": 100.01,
    "costIntervalStart": "2019-01-01T00:00:00Z",
    "budgetAmount": 100.00,
    "budgetAmountType": "SPECIFIED_AMOUNT",
    "currencyCode": "USD"
  })

  res.send({ published: msg })
})

export const myBudgetAlert = functions.pubsub.topic('my-budget-alert').onPublish(message => {
  try {
    const data = message.json as PubSubData;
    const amount = data.costAmount;
    console.log('------------')
    console.log(amount);
  } catch (error) {
    console.error('Could not parse json message from pubsub.')
  }
  return null;
})
