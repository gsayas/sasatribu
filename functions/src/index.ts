import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAdQqHo2Hw6gAwFm0vTexkzicCykMZ7cGo",
//   authDomain: "tribu-ff872.firebaseapp.com",
//   databaseURL: "https://tribu-ff872-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "tribu-ff872",
//   storageBucket: "tribu-ff872.appspot.com",
//   messagingSenderId: "220387369572",
//   appId: "1:220387369572:web:65944fbc293271fdc0f571",
//   measurementId: "G-0PFDKL6ESK"
// };

// // Initialize Firebase
// const firebase = initializeApp(firebaseConfig);
// const database = getDatabase(firebase);

const admin = require('firebase-admin');
admin.initializeApp();


export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const msg = req.query.text;

  admin.database().ref('messages/').push({text: msg});
  // Send back a message that we've successfully written the message
  res.send({result: `Message added.`});
});
