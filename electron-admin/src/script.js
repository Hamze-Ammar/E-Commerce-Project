// Declare variables for button elements===============

// Get the modal Login
const login_modal = document.getElementById("login-modal");
// Get the button that opens the modal
const login_btn = document.getElementById("login");
// Get the <span> element that closes the modal
const login_span = document.getElementsByClassName("close")[0];
// Get the add category btn
const add_category_btn = document.getElementById("add-category-btn");
// Get the add item btn
const add_item_btn = document.getElementById("add-item-btn");
// array to store the buttons
const forms = [add_category_btn, add_item_btn];

//End variables section===================================

// ====Modal section functionality==
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
// ======End modal section ===

//Display forms on click
add_category_btn.onclick = function(){
    let forms = document.getElementsByClassName("form");
    for(var i = 0; i < forms.length; i++){
        forms[i].style.display = "none";
    }
    let add_category = document.getElementsByClassName("add-category")[0];
    add_category.style.display = "block";
}
add_item_btn.onclick = function(){
    let forms = document.getElementsByClassName("form");
    for(var i = 0; i < forms.length; i++){
        forms[i].style.display = "none";
    }
    let add_item = document.getElementsByClassName("add-item")[0];
    add_item.style.display = "block";
}