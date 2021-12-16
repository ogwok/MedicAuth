const authSwitchLinks = document.querySelectorAll(".switch");
const authModals = document.querySelectorAll(".auth .modal");
const authWrapper = document.querySelector(".auth");
const registerForm = document.querySelector(".register");
const loginForm = document.querySelector(".login");
const signOut = document.querySelector(".sign-out");

// toggle auth modals
authSwitchLinks.forEach((link) => {
  link.addEventListener("click", () => {
    authModals.forEach((modal) => modal.classList.toggle("active"));
  });
});

// register form
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = registerForm.email.value;
  const password = registerForm.password.value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("registered", user);
      registerForm.reset();
    })
    .catch((error) => {
      registerForm.querySelector(".error").textContent = error.message;
    });
});

// login form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  // firebase
  //   .auth()
  //   .signInWithEmailAndPassword(email, password)
  //   .then((user) => {
  //     console.log("logged in", user);
  //     loginForm.reset();
  //   })
  //   .catch((error) => {
  //     loginForm.querySelector(".error").textContent = error.message;
  //   });
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  

});

// sign out
signOut.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log("signed out"));
});

// auth listener
firebase.auth().onAuthStateChanged((user) => {
  
  if (user )  {
    console.log("loggin successful");
    const queryRef = firebase.firestore().collection('pharmacies');
    // ref = queryRef.where("pharmaregno", "==", firebase.auth().currentUser.email);
    ref = queryRef.where("email", "==", firebase.auth().currentUser.email);
    ref.onSnapshot(snapshot => {
        let requests = [];
        snapshot.forEach(doc => {
          requests.push({...doc.data(), id: doc.id})
        })
        if (requests.length > 0){
          console.log("pharmacy regestered");
          window.location = `${window.location}pharma/index.html`;
        }else{
          console.log("pharmacy not regestered");
        }
    })
      // window.location = `${window.location}pharma/index.html`;
  } else {
    
  }

 
});
