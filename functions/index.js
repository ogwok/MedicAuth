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

// http callable function (to add medicine to database)
exports.addRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests"
    );
  }
  if (data.batch.length > 15) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Batch must be no more than 15 characters long"
    );
  } 
  return admin.firestore().collection("pharmarcydatabase").add({
    batchno: data.batch,
    medname: data.name,
    mufdate: data.mufdate,
    expdate: data.expdate,
    id : "admin",
  });
});

// http callable function (to add medicine to database by pharmacies)
exports.addPharmDrug = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests"
    );
  }
  if (data.batch.length > 15) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Batch must be no more than 15 characters long"
    );
  } 
  return admin.firestore().collection("pharmarcydatabase").add({
    batchno: data.batch,
    medname: data.name,
    mufdate: data.mufdate,
    expdate: data.expdate,
    id: data.id,
    
  });
});


// http callable function (to add report about fake products to database)
exports.addComplaint = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests"
    );
  }
  if (data.phone.length > 10) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Phone number must be no more than 10 characters long"
    );
  } 
  return admin.firestore().collection("complaints").add({
    fname: data.fname,
    location: data.location,
    phone: data.phone,
    medName: data.medName,
    details: data.details,
    id: data.id,
  });
});

// http callable function (to add pharmacies to database)
exports.addPharma = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests"
    );
  }
  if (data.regno.length > 10) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Registration number must be no more than 10 characters long"
    );
  } 
  return admin.firestore().collection("pharmacies").add({
    pharmaname: data.name,
    pharmaregno: data.regno,
    email: data.email
    
  });
});
// update medical database records function
exports.updateRecord = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests"
    );
  }
  
   const request = admin.firestore().collection('pharmarcydatabase').doc(data.id);
  return request.update({  
    age:  admin.firestore.FieldValue.increment(1)
  })
  
})

// delete medical database records function
exports.deleteRecord = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests"
    );
  }

   const request = admin.firestore().collection('pharmarcydatabase').doc(data.id);
  return request.delete();
  
})