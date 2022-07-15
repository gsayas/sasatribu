import * as functions from "firebase-functions";

const admin = require('firebase-admin');
try {
	admin.app();
} catch(e) {
	admin.initializeApp();
}

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.addMessage = functions.https.onRequest((req, res) => {
  const msg = req.query.text;

  admin.database().ref('messages/').push({text: msg});
  res.send({result: `Message added.`});
});
