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
When angular app is ready for a production use `cd app` and then `ng build --prod`. This will compile angular app into dist/app folder. 

Before deploying, it's a good practice to test compiled app locally. In order to do that, first [run firebase locally](#run-firebase-locally) then open firebase hosting emulator. This will open localhost:5000 by default with production ready app.

After app has been tested, we can deploy using: `cd app` and then `firebase deploy --only hosting`.
Angular app should be deployed to firebase.