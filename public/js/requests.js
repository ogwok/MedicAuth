const checklink = document.querySelector(".new-check form");
// const formElem = document.querySelector(".new-check form")
checklink.addEventListener('submit', (e) => {
    e.preventDefault();
     
     new FormData(checklink);
    
})
checklink.addEventListener('formdata', (e) => {
    
    let data = e.formData;
  
  for (var value of data.values()) {}
  let finalValue = value;
  
    const ref = firebase.firestore().collection('requests');
    let counter;
    ref.onSnapshot(snapshot => {
       snapshot.forEach(doc =>{  
                
           if(doc.data().text == finalValue ){
               counter = 1;
               // console.log("record seen");
           }
          
       })
       if(counter == 1){
           console.log("record available");
           let html = ``;
           html += `<li>🔵 Validation Passed </li>`;
           document.querySelector('ul').innerHTML = html;
       }else{
           console.log("record not available");
           let html = ``;
           html += `<li>🔴 Validation Failed </li>`;
           document.querySelector('ul').innerHTML = html;
           
       }
    })
    

  
});