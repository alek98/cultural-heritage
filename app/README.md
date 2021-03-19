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