// Declare variables for button elements===============

// Get the modal Login
const login_modal = document.getElementById("login-modal");
// Get the button that opens the modal
const login_btn = document.getElementById("login");
// Get submit login btn
const login_submit_btn = document.getElementById("login-submit-btn");
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
  if (event.target == login_modal) {
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

// Linking ==========================================

//Login
login_submit_btn.onclick = function(e){
    e.preventDefault();
    let email = document.getElementById("email-input").value;
    let password = document.getElementById("password-input").value;

    //data to be sent to the POST request
    let _data = {
        email: email,
        password: password,
    }

    fetch('http://127.0.0.1:8000/api/v1/admin/login_admin', {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json =>  handleResponseLogin(json))
        .catch(err => console.log(err));

}


function handleResponseLogin(json){
    if (json.access_token){
        let access_token = json.access_token;
        let token_type = json.token_type;
        
        //Save to local storage 
        localStorage.setItem("access_token", access_token );
        localStorage.setItem("token_type", token_type );
        
        login_modal.style.display = "none";
        alert("You are now logged in 'Admin'!");

    }
    else if (json.email){
        alert(json.email);
        location.reload(true);
    }
    else if (json.password){
        alert(json.password);
        location.reload(true);
    }else if (json.error){
        alert(json.error);
        location.reload(true);
    }
}

