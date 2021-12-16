const requestForm = document.querySelector(".medic-form form");

var app = new Vue({
    el: '#app',
    data: {
      reports: [],
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
        const queryRef = firebase.firestore().collection('reports');

        function delay(time) {
          return new Promise(resolve => setTimeout(resolve, time));
        }
        var details = delay(5000).then(() => (firebase.auth().currentUser.email));
        details.then((val) => {
          ref = queryRef.where("id", "==", val);
          ref.onSnapshot(snapshot => {
            let requests = [];
            snapshot.forEach(doc => {
              requests.push({...doc.data(), id: doc.id})
            })
            this.reports = requests;
            console.log(requests);
        })
        }
        );

        // ref = queryRef.where("permsission", "==", firebase.auth().currentUser.email);
        // ref = queryRef.where("id", "==", "pharmacies");
       
        // function delay(time) {
        //   return new Promise(resolve => setTimeout(resolve, time));
        // }
        // delay(5000).then(() => console.log(firebase.auth().currentUser.email));
        // ref.onSnapshot(snapshot => {
        //     let requests = [];
        //     snapshot.forEach(doc => {
        //       requests.push({...doc.data(), id: doc.id})
        //     })
        //     this.reports = requests;
        //     console.log(requests);
        // })

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
  console.log("drug clicked addPharmDrug");
  const addRequest = firebase.functions().httpsCallable("addPharmDrug");
  
  addRequest({
    batch: requestForm.batchno.value,
    name: requestForm.name.value,
    mufdate: requestForm.manufacture.value,
    expdate: requestForm.expiry.value,
    id: firebase.auth().currentUser.email,
    
  })
    .then(() => {
      requestForm.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});
// add a new drug to the database
requestForm.addEventListener("online", (e) => {
  e.preventDefault();
  console.log("hello am online");
});


// console.log(` user email is ${firebase.auth().currentUser.email}`); 

// let html = ``;
// requests.forEach(request => {
//     html += `<li>${request.text}</li>`
// });
// document.querySelector('ul').innerHTML = html;