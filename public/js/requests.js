const complaintForm = document.querySelector(".old-request form");
const checklink = document.querySelector(".new-check form");
// const formElem = document.querySelector(".new-check form")


checklink.addEventListener("submit", (e) => {
  e.preventDefault();

  new FormData(checklink);
});
checklink.addEventListener("formdata", (e) => {
  e.preventDefault();
  let data = e.formData;

  for (var value of data.values()) {
  }
  let finalValue = value;


  var app = new Vue({
    el: '#app-validate',
    data: {
      pharmarcydatabase: [],
      message: "",
      
    },
    
    mounted(){
        const queryRef = firebase.firestore().collection('pharmarcydatabase');
        ref = queryRef.where("batchno", "==", finalValue);
        ref.onSnapshot(snapshot => {
            let requests = [];
            snapshot.forEach(doc => {
              requests.push({...doc.data(), id: doc.id})
            })
            if(requests.length > 0){
              let html = ``;
              html += `<li>🔵 Validation Passed </li>`;
              document.querySelector(".content ul").innerHTML = html;
            console.log(requests);
            }else{
              let html = ``;
              html += `<li>🔴 Validation Failed </li>`;
              document.querySelector(".content ul").innerHTML = html;
            }
        })
    }
  })
 
});

// add a new request
complaintForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("sending form request");
  const addRequest = firebase.functions().httpsCallable("addComplaint");
  const authuser = firebase.auth().currentUser;
  const email = authuser.email;
  
  addRequest({
    fname: complaintForm.fname.value,
    location: complaintForm.location.value,
    phone: complaintForm.phone.value,
    medName: complaintForm.medName.value,
    details: complaintForm.details.value,
    id: email,
  })
    .then(() => {
      requestForm.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});
