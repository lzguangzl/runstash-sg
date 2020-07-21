# RunStash Cloud Functions

## Purpose of the project

To keep track of my running data

## Project setup

This project is created using Firebase with Node.js 8 runtime

Note: The Node.js 8 runtime is deprecated and will be decommissioned on 2021-03-15. For more information, see: https://firebase.google.com/support/faq#functions-runtime

Firebase Develop

- Authentication
- Database
- Storage
- Functions

Language

- Javascript
- NodeJS

Dependencies

- busboy
- express
- firebase
- firebase-admin
- firebase-functions

### What's Cloud Functions for Firebase?

Cloud Functions is a hosted, private, and scalable Node.js environment where you can run JavaScript code. [Cloud Functions for Firebase](https://firebase.google.com/features/functions) integrates the Firebase platform by letting you write code that responds to events and invokes functionality exposed by other Firebase features.

## Pre-requisites

To learn how to get started with Cloud Functions for Firebase by having a look at their [Getting Started Guide](https://firebase.google.com/docs/functions/get-started), and looking at [The Documentation](https://firebase.google.com/docs/functions).

## Setting up the project

1. Setup admin.json

```
i. Download Admin SDK configuration snippet from Service accounts in your Firebase console

Project Overview -> Settings -> Service accounts -> Generate new private key

ii. Rename it as admin.json
iii. Create a keys folder under functions
iv. Add it into keys folder
```

2. Setup config.js

```
i. Copy firebaseConfig from Firebase SDK snippet from General in your Firebase console

Project Overview -> Settings -> General -> Firebase SDK snippet

ii. Create a config.js inside util folder
iii. Paste the firebaseConfig data into config.js and export it out

```

## Deploy and test

- Start serving your project locally using `firebase serve`
- Deploy your project using `firebase deploy`
