import * as functions from 'firebase-functions'
import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'
import { inspect } from 'util'
import { PubSub } from '@google-cloud/pubsub'
const pubsub = new PubSub()

const billing = google.cloudbilling('v1').projects
const PROJECT_ID = process.env.GCLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;
const KILL_PROJECT_AMOUNT = 0.4; // if amount is over 40 cents, disable billing

interface PubSubData {
  "budgetDisplayName": string,
  "alertThresholdExceeded": number,
  "costAmount": number,
  "costIntervalStart": string,
  "budgetAmount": number,
  "budgetAmountType": string,
  "currencyCode": "USD"
}

export const getBillingInfo = functions.https.onRequest(async (req, res) => {
  setCredentialsForBilling()
  const billingInfo = await billing.getBillingInfo({ name: PROJECT_NAME })
  console.log('Here is my billing: \n---------\n')
  console.log(inspect(billingInfo))
  res.sendStatus(200)
})

function setCredentialsForBilling() {
  const client = new GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/cloud-billing',
      'https://www.googleapis.com/auth/cloud-platform',
    ],
  });

  google.options({
    auth: client
  })
}

async function disableBillingForReal() {
  setCredentialsForBilling()
  const billingInfo = await billing.getBillingInfo({ name: PROJECT_NAME })
  if (billingInfo.data.billingEnabled) {
    const res = await billing.updateBillingInfo({
      name: PROJECT_NAME,
      requestBody: { billingAccountName: '' }
    })

    console.log('BILLING IS DISABLED', res.status);
  }
  else {
    console.log('Billing is already disabled.')
  }
}


// curl http://localhost:5001/cultural-heritage-c8349/us-central1/mockPubSubBilling
export const mockPubSubBilling = functions.https.onRequest(async (req, res) => {
  // use only when testing locally
  const isEmulated = process.env.FUNCTIONS_EMULATOR;
  if (!isEmulated) return;

  const msg = await pubsub.topic('my-budget-alert').publishJSON({
    "budgetDisplayName": "name-of-budget",
    "alertThresholdExceeded": 1.0,
    "costAmount": 0.6,
    "costIntervalStart": "2019-01-01T00:00:00Z",
    "budgetAmount": 100.00,
    "budgetAmountType": "SPECIFIED_AMOUNT",
    "currencyCode": "USD"
  })

  res.send({ published: msg })
})

export const handleBudgetAlert = functions.pubsub.topic('my-budget-alert').onPublish(async message => {
  try {
    const data = message.json as PubSubData;
    const amountSpentSoFar = data.costAmount;
    if (amountSpentSoFar >= KILL_PROJECT_AMOUNT) {
      await disableBillingForReal()
      console.log('BILLING IS DISABLED. CHANGED TO SPARK PLAN.')

    }
  } catch (error) {
    console.error('AN ERROR OCCURED WHILE DISABLING BILLING.')
  }
  return null;
})
