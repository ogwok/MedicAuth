if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("service worker registered", reg))
    .catch((err) => console.log("service worker not registered", err));
}

const requestModal = document.querySelector(".new-request");
const requestLink = document.querySelector(".add-request");
const requestForm = document.querySelector(".new-request form");
const toHome = document.querySelector(".to-home");
const Home = document.querySelector(".content");
const Menu = document.querySelector(".content-menu");

//close content Menu
toHome.addEventListener("click", () => {
  Menu.classList.remove("active");
  Home.classList.add("open");
  console.log("to home clicked");
});

// open request modal
requestLink.addEventListener("click", () => {
  requestModal.classList.add("open");
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
