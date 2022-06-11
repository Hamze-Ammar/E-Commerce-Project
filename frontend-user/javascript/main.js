// Get the modal Login
var login_modal = document.getElementById("login-modal");

// Get the button that opens the modal
var login_btn = document.getElementById("login");

// Get the <span> element that closes the modal
var login_span = document.getElementsByClassName("close")[0];

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