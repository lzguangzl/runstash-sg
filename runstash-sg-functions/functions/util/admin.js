const admin = require("firebase-admin");
const serviceAccount = require("../keys/admin.json");
const { firebaseConfig } = require("../util/config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseConfig.storageBucket,
});
const db = admin.firestore();

module.exports = {
  admin,
  db,
};
