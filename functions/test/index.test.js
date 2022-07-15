const admin = require('firebase-admin');

const chai = require('chai');
const assert = chai.assert;

const projectConfig = {
    databaseURL: "https://tribu-ff872-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tribu-ff872",
    storageBucket: "tribu-ff872.appspot.com",
}

const serviceAccountFilePath = './../secrets/serviceAccountKey.json';
const serviceAccount = require(serviceAccountFilePath);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: projectConfig.databaseURL
});
const test = require('firebase-functions-test')(projectConfig, serviceAccountFilePath);


describe('Cloud Functions', () => {
    let myFunctions;

    before(() => {
        myFunctions = require('../lib/index');
    });

    after(async () => {
        test.cleanup();
        await admin.database().ref('messages').remove();
    });

    describe('addMessage', () => {
        it('should return a Success message', (done) => {
            const req = { query: { text: 'input-test' } };

            const res = {
                send: (res) => {
                    assert.equal(res.result, 'Message added.');
                    done();
                }
            };

            myFunctions.addMessage(req, res);
        });
    });

});