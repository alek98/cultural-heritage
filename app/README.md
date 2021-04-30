# Initialize App

## Initialize angular
`ng new app`

## Add official angularfire dependecy for angular
`ng add @angular/fire`

For documentation click [here](https://github.com/angular/angularfire)

## Add firebase
`firebase init`

For documentation click [here](https://firebase.google.com/docsttps://github.com/angular/angularfire)

# Run App

## Run angular
`cd app`

`ng serve --o` - start local angular server

## Run firebase locally
`cd app`

`npx tsc --watch` - must compile functions first

`firebase emulators:start` - start local firebase server

`firebase emulators:start --import ../testdata` - start local firebase server with imported test data

`firebase emulators:export ../testdata` - export testdata

# Get ready for production
### Deploy angular app & hosting
When angular app is ready for a production use `cd app` and then `ng build --prod`. This will compile angular app into dist/app folder. 

Before deploying, it's a good practice to test compiled app locally. In order to do that, first [run firebase locally](#run-firebase-locally) then open firebase hosting emulator. This will open localhost:5000 by default with production ready app.

After app has been tested, we can deploy using: `cd app` and then `firebase deploy --only hosting`.
Angular app should be deployed to firebase.

### Deploy firestore
When deploying firestore, we will deploy firestore database and firestore rules. When ready for a production use `cd app` and then `firebase deploy --only firestore`.
If updating only firestore rules and not dummy test database, use `firebase deploy --only firestore:rules`.

### Deploy functions
First change from Spark plan to Blaze plan (pay-as-you-go).
First, run `cd app/functions`, then run `npm run lint`. Here we can see all of the warnings and errors that linter finds. In order to let linter fix the errors run `npm run lint -- --fix`. After that check again for other errors linter hasn't fixed by running `npm run lint`. Manually fix those errors.
<i>Tip 1: open .eslintrc.js file and put or disable linter rules by editing rules section. Tip 2: comment out google extension to disable max-line-len error for 80 characters.</i>

When errors are fixed and `npm run lint` doesn't give any errors or warnings, compile typescript files with `npx tsc`. This is neccessary because compiled files will be deployed, not typescript files. 

After that run `cd app` and then `firebase deploy --only functions`. Now functions should be available in the firebase console.


### Auto turn off billing for firebase project
First, go to Google Cloud Platform -> Billing -> Budgets & alerts -> Create Budget -> Checkbox connect a PubSub topic to this budget -> Save.
Second, enable Cloud Billing API for a project in GCP.
Third, write a functions for turning off billing.
More info [here](https://cloud.google.com/billing/docs/how-to/notify#cap_disable_billing_to_stop_usage)
