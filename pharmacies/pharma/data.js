function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
  delay(5000).then(() => firebase.auth().currentUser.email);