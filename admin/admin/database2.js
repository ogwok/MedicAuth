const pharmForm = document.querySelector(".pharm-form form");
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
        const ref = firebase.firestore().collection('reports');
        ref.onSnapshot(snapshot => {
            let requests = [];
            snapshot.forEach(doc => {
              requests.push({...doc.data(), id: doc.id})
            })
            this.reports = requests;
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


// add a new pharmarcy to the database
pharmForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("clicked!!");
  const addRequest = firebase.functions().httpsCallable("addPharma");
  
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

