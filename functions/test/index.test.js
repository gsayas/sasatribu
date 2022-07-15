
const admin = require('firebase-admin');

const chai = require('chai');
const assert = chai.assert;

const projectConfig = {
    databaseURL: "https://tribu-ff872-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tribu-ff872",
    storageBucket: "tribu-ff872.appspot.com",
}
const test = require('firebase-functions-test')(projectConfig, './secrets/service-account.json');


describe('Cloud Functions', () => {
  let myFunctions;

  before(() => {
    // Require index.js and save the exports inside a namespace called myFunctions.
    // This includes our cloud functions, which can now be accessed at myFunctions.makeUppercase
    // and myFunctions.addMessage
    myFunctions = require('../lib/index');

  });

  after(() => {
    // Do cleanup tasks.
    test.cleanup();
    // Reset the database.
    admin.database().ref('messages').remove();
  });

  describe('addMessage', () => {
    it('should return a Success message', (done) => {
      // A fake request object, with req.query.text set to 'input'
      const req = { query: {text: 'input-test'} };
      // A fake response object, with a stubbed redirect function which does some assertions
      //const wrapped = test.wrap(myFunctions);
      const res = {
        send: (res) => {
          assert.equal(res.result, 'Message added.');
          done();
        }
      };

      // Invoke addMessage with our fake request and response objects. This will cause the
      // assertions in the response object to be evaluated.
      myFunctions.addMessage(req, res);
    });
  });

});
