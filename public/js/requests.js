const complaintForm = document.querySelector(".old-request form");
const checklink = document.querySelector(".new-check form");
// const formElem = document.querySelector(".new-check form")
checklink.addEventListener("submit", (e) => {
  e.preventDefault();

  new FormData(checklink);
});
checklink.addEventListener("formdata", (e) => {
  let data = e.formData;

  for (var value of data.values()) {
  }
  let finalValue = value;

  const ref = firebase.firestore().collection("requests");
  let counter;
  ref.onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
      if (doc.data().text == finalValue) {
        counter = 1;
        // console.log("record seen");
      }
    });
    if (counter == 1) {
      console.log("record available");
      let html = ``;
      html += `<li>🔵 Validation Passed </li>`;
      document.querySelector(".content ul").innerHTML = html;
    } else {
      console.log("record not available");
      let html = ``;
      html += `<li>🔴 Validation Failed </li>`;
      document.querySelector(".content ul").innerHTML = html;
    }
  });
});

// add a new request
complaintForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("sending form request");
  const addRequest = firebase.functions().httpsCallable("addComplaint");
  
  addRequest({
    fname: complaintForm.fname.value,
    location: complaintForm.location.value,
    phone: complaintForm.phone.value,
    medName: complaintForm.medName.value,
    details: complaintForm.details.value,
    
  })
    .then(() => {
      requestForm.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});
