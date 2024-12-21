
const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  
});
const auth = admin.auth();
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

export {auth, db, FieldValue}
