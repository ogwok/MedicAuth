const requestForm = document.querySelector(".old-request form");

var app = new Vue({
    el: '#app',
    data: {
      pharmarcydatabase: []
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

        ref.onSnapshot(snapshot => {
            let requests = [];
            snapshot.forEach(doc => {
              requests.push({...doc.data(), id: doc.id})
            })
            this.pharmarcydatabase = requests;
            console.log(requests);
        })
       
    }
  })



// add a new request
requestForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const addRequest = firebase.functions().httpsCallable("addRequest");
  
  addRequest({
    name: requestForm.fname.value,
    age: requestForm.age.value,
    location: requestForm.location.value,
    gender: requestForm.gender.value,
    report: requestForm.report.value,
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