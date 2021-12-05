if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("service worker registered", reg))
    .catch((err) => console.log("service worker not registered", err));
}


const requestModal = document.querySelector(".new-request");

const requestForm = document.querySelector(".new-request form");
const toHome = document.querySelector(".to-home");
const Home = document.querySelector(".content");
const Complaints = document.querySelector(".content-complaints");
const toComplaints = document.querySelector(".to-complaints");
const Menu = document.querySelector(".content-menu");
const toCounterfeit = document.querySelector(".to-counterfeit");
const Counterfeit = document.querySelector(".content-counterfeit");
const toMenu = document.querySelector(".to-menu");
const toMenu2 = document.querySelector(".to-menu2");
const toMenu3 = document.querySelector(".to-menu3");

//navigate to main Menu from report counterfeit page
toMenu.addEventListener("click", () => {
  Counterfeit.classList.remove("active");
  Menu.classList.add("active");
});

//navigate to main Menu from main auth page
toMenu2.addEventListener("click", () => {
  Home.classList.remove("open");
  Menu.classList.add("active");
});

//navigate to main Menu from compliants page
toMenu3.addEventListener("click", (e) => {
  e.preventDefault();
  const authuser = firebase.auth().currentUser;
  const email = authuser.email;
  Complaints.classList.remove("open");
  Menu.classList.add("active");
});

//navigate to main Menu from main auth page
toMenu2.addEventListener("click", () => {
  Home.classList.remove("open");
  Menu.classList.add("active");
});

//navigate to the home page
toHome.addEventListener("click", () => {
  Menu.classList.remove("active");
  Home.classList.add("open");
});

//navigate to the counterfeit page
toCounterfeit.addEventListener("click", () => {
  Menu.classList.remove("active");
  Counterfeit.classList.add("active");
});

//navigate to the complaints page
toComplaints.addEventListener("click", (e) => {
  var app = new Vue({
    el: '#apppp',
    data: {
      complaints: [],
      email: "william@gmail.com",
      
    },
    
    mounted(){
   
        const queryRef = firebase.firestore().collection('complaints');
        refComplaints = queryRef.where("id", "==", firebase.auth().currentUser.email );
        refComplaints.onSnapshot(snapshot => {
            let userComplaints = [];
            snapshot.forEach(doc => {
              userComplaints.push({...doc.data(), id: doc.id})
            })
            this.complaints = userComplaints;
            console.log(userComplaints);
        })
        
    }
  })
  Menu.classList.remove("active");
  Complaints.classList.add("open");
 
});



// close request modal
requestModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("new-request")) {
    requestModal.classList.remove("open");
  }
});

// add a new request
requestForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const addRequest = firebase.functions().httpsCallable("addRequest");
  addRequest({
    text: requestForm.request.value,
  })
    .then(() => {
      requestForm.reset();
      requestForm.querySelector(".error").textContent = "";
      requestModal.classList.remove("open");
    })
    .catch((error) => {
      requestForm.querySelector(".error").textContent = error.message;
    });
});
