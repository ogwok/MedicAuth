const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  // for background triggers you must return a value/promise
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
  });
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});

// http callable function (adding a report)
exports.addRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests"
    );
  }
  if (data.report.length > 3000) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "request must be no more than 3000 characters long"
    );
  } 
  return admin.firestore().collection("reports").add({
    name: data.name,
    age: data.age,
    location: data.location,
    gender: data.gender,
    report: data.report,
  });
});

// update  records function
exports.updateRecord = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests"
    );
  }

   const request = admin.firestore().collection('reports').doc(data.id);
  return request.update({  
    age:  admin.firestore.FieldValue.increment(1)
  })
  
})

// delete records function
exports.deleteRecord = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests"
    );
  }

   const request = admin.firestore().collection('reports').doc(data.id);
  return request.delete();
  
})