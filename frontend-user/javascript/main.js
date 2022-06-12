// Get the modal Login
var login_modal = document.getElementById("login-modal");

// Get the button that opens the modal
var login_btn = document.getElementById("login");

// Get the <span> element that closes the modal
var login_span = document.getElementsByClassName("close")[0];

//Get msg modal
var msg_modal = document.getElementById("msg-modal");

// When the user clicks the button, open the modal 
login_btn.onclick = function() {
    login_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
login_span.onclick = function() {
    login_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    login_modal.style.display = "none";
  }
}

// Get the modal Register
var register_modal = document.getElementById("register-modal");

// Get the button that opens the modal
var register_btn = document.getElementById("register");

// Get the <span> element that closes the modal
var register_span = document.getElementsByClassName("register-close")[0];

// When the user clicks the button, open the modal 
register_btn.onclick = function() {
    login_modal.style.display = "none";
    register_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
register_span.onclick = function() {
    register_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == register_modal) {
    register_modal.style.display = "none";
  }
}

// Sign Up =========================
// validate email address function
function validateEmail (emailAddress){
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAddress.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}
function validatePassword(pass){
  if (pass.length<6){
    return false;
  }
  return true;
}

let register_submit_btn = document.getElementById("sign-up-submit");
register_submit_btn.onclick = function(){
  let name = document.getElementById("name-signup").value;
  let email = document.getElementById("email-signup").value;
  let password = document.getElementById("password-signup").value;
  let password_confirmation = document.getElementById("password_confirmation-signup").value;
  document.getElementById("msg-signup").innerHTML = "";
  if (!name || !email || !password){
    document.getElementById("msg-signup").innerHTML = "Missing values! All fields are required";
    return
  }
  console.log(validateEmail(email));
  if (!validateEmail(email)){
    document.getElementById("msg-signup").innerHTML = "Invalid email Address!";
  }
  if (!validatePassword(password)){
    document.getElementById("msg-signup").innerHTML = "Password should be at least of 6 characters!";
  }
  if (password !== password_confirmation){
    document.getElementById("msg-signup").innerHTML = "The password confirmation does not match.";
  }
  //Axios
  let my_url = 'http://127.0.0.1:8000/api/v1/user/register';
  let data = new FormData();
  data.append('name', name);
  data.append('email', email);
  data.append('password', password);
  data.append('password_confirmation', password_confirmation);
  axios({
  method: "post",
  url: my_url,
  data: data,

  }).then(function (response) {
      handleRegisterResponse(response);
  }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        if(error.response.data.email){
          alert(error.response.data.email[0]);
        }
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }})
}

function handleRegisterResponse(response){
  console.log(response.data.message);
  if (response.data.message=='User successfully registered'){
    register_modal.style.display = "none";
    msg_modal.style.display = "block";
  }
}