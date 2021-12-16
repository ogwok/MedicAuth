var app = new Vue({
    el: '#appp',
    data: {
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