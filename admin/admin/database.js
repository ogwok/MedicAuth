const requestForm = document.querySelector(".medic-form form");
const pharmForm = document.querySelector(".pharm-form form");
var app = new Vue({
    el: '#app',
    data: {
      pharmarcydatabase: [],
      complaints: [],
    },
    methods: {
      updateRecord(id){
       console.log(id);
       const updateRec = firebase.functions().httpsCallable('updateRecord');
       updateRec({ id }).catch(error => {
         console.log(error);
       })
      },
      deleRecord(id){
        console.log(id);
        const delRec = firebase.functions().httpsCallable('deleteRecord');
        delRec({ id }).catch(error => {
          console.log(error);
        })
       }
    },
    mounted(){
        const ref = firebase.firestore().collection('pharmarcydatabase');
        // ref = queryRef.where("medname", "==", "Panadol");
        ref.onSnapshot(snapshot => {
            let requests = [];
            snapshot.forEach(doc => {
              requests.push({...doc.data(), id: doc.id})
            })
            this.pharmarcydatabase = requests;
            console.log(requests);
        })

        const refComplaints = firebase.firestore().collection('complaints');
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



// add a new drug to the database
requestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("drug clicked");
  const addRequest = firebase.functions().httpsCallable("addRequest");
  
  addRequest({
    batch: requestForm.batchno.value,
    name: requestForm.name.value,
    mufdate: requestForm.manufacture.value,
    expdate: requestForm.expiry.value,
    
  })
    .then(() => {
      requestForm.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});

// add a new pharmarcy to the database
pharmForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("clicked!!");
  const addRequest = firebase.functions().httpsCallable("addRequest");
  
  addRequest({
    name: pharmForm.name.value,
    regno: pharmForm.regno.value,
    
    
  })
    .then(() => {
      requestForm.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});

// let html = ``;
// requests.forEach(request => {
//     html += `<li>${request.text}</li>`
// });
// document.querySelector('ul').innerHTML = html;