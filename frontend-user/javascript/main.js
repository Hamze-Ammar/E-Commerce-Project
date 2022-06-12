// Get the modal Login
var login_modal = document.getElementById("login-modal");

// Get the button that opens the modal
var login_btn = document.getElementById("login");

//Get login submit btn
var login_btn_submit = document.getElementById("signin-submit");

// Get the <span> element that closes the modal
var login_span = document.getElementsByClassName("close")[0];

//Get msg modal
var msg_modal = document.getElementById("msg-modal");

// sign in btn from msd modal
var login_btn_msg_modal = document.getElementById("login-modal-success");

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

var display_all_items = document.getElementById("display-all-items-btn");
display_all_items.onclick = function(){
  displayItemsOnload();
}

window.onload = function() {
  displayItemsOnload();
}



// When the user clicks the button, open the modal 
register_btn.onclick = function() {
    login_modal.style.display = "none";
    register_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
register_span.onclick = function() {
    register_modal.style.display = "none";
}

var categories_modal = document.getElementById("display-categories-modal");
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == register_modal) {
    register_modal.style.display = "none";
  }
  if (event.target == categories_modal) {
    categories_modal.style.display = "none";
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
  if (response.data.message=='User successfully registered'){
    register_modal.style.display = "none";
    msg_modal.style.display = "block";
  }
}

// Prompt sign in modal after regiser
login_btn_msg_modal.onclick = function(){
  msg_modal.style.display = "none";
  login_modal.style.display = "block";
}


// Sign user ================
login_btn_submit.onclick = function(){
  let email = document.getElementById("email-login").value;
  let password = document.getElementById("password-login").value;
  //Axios
  let my_url = 'http://127.0.0.1:8000/api/v1/user/login';
  let data = new FormData();
  data.append('email', email);
  data.append('password', password);
  axios({
  method: "post",
  url: my_url,
  data: data,

  }).then(function (response) {
      handleLoginResponse(response);
  }).catch(function (error) {
    if (error.response) {
      // Request made and server responded
      if(error.response.data.email){
        alert(error.response.data.email[0]);
      }
      console.log(error.response.status);
      if(error.response.status=='401'){
        alert("Invalid email or password");
      }
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
  }})
}

function handleLoginResponse(response){
  //console.log(response.data.access_token);
  if (response.data.access_token){
    localStorage.setItem("access_token", response.data.access_token);
    //console.log(localStorage.getItem("access_token"));
    alert("You are now signed in!")
    login_modal.style.display = "none";
  }
}


/// Dislay Items onload
function displayItemsOnload(){
    let my_url = 'http://127.0.0.1:8000/api/v1/main';
    axios({
    method: "get",
    url: my_url,
  
    }).then(function (response) {
      handleGetItemsResponse(response);
    }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.status);
        if(error.response.status=='401'){
          alert("Invalid email or password");
        }
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        //console.log('Error', error.message);
    }})
}


function handleGetItemsResponse(response){
  if (response.data.items){
    let container = document.getElementById("container");
    response.data.items.forEach((item)=>{
      container.innerHTML += `<div class="card" id="${item.id}">
                                  <div class="card-img">
                                      <img src="" alt="">
                                  </div>
                                  <div class="card-footer">
                                      <div class="card-footer-txt">
                                          <p class="card-item-title">${item.name}</p>
                                          <p class="card-price">$${item.price}</p>
                                          <p class="card-description">${item.description}</p>
                                      </div>
                                      <div class="card-footer-heart">
                                          <i id="${item.id}" onClick="addToFavourite(this)" class="fa fa-thin fa-heart"></i>
                                      </div>
                                  </div>
                              </div>`
    })
  }
}


let addToFavourite = (e) => {
  if (e.style.color == "orange"){
    return;
  }
  //check if user signed in
  let token = localStorage.getItem("access_token");
  if (!token){
    alert("You are not signed in!");
    return;
  }
  let item_id = e.id;

  let myheaders = "Bearer " + token;
  //Axios
  let my_url = 'http://127.0.0.1:8000/api/v1/user/add_favourite';
  let data = new FormData();
  data.append('item_id', item_id);
  let headers = {};
  headers.Authorization = myheaders;
  axios({
  method: "post",
  url: my_url,
  data: data,
  headers: headers,

  }).then(function (response) {
      if (response.data.status=="Please login first"){
        console.log(response.data);
        alert("Please login first");
        return
      }
      if (response.data.status=="Success"){
        e.style.color = "orange";
      }
  })
}

// Display categories
document.getElementById("categories-btn-header").onclick = function(){

  // Call the get categories api
  let my_url= "http://127.0.0.1:8000/api/v1/get_all_categories";
  axios({
      method: "get",
      url: my_url,
  
      }).then(function (response) {
          displayCategories(response);
      });
}


function displayCategories(response) {
  if (response.data.status!=="Success"){
      //error
      console.log(response);
      return
  }
  const categories = response.data.response;
  let modal = document.getElementById("categories-modal");
  categories.forEach((category)=>{
      modal.innerHTML += `<p onClick="displayItemsByCategory(this)" id="${category.id}">${category.name}</p>`;
  });
  // Display modal
  document.getElementById("display-categories-modal").style.display = "block";
  document.getElementById("closeCategories").addEventListener("click",function(){
    document.getElementById("display-categories-modal").style.display = "none";
  })

}

let displayItemsByCategory = (e) => {
  //close modal
  document.getElementById("display-categories-modal").style.display = "none";
  let id = e.id;
  let my_url = `http://127.0.0.1:8000/api/v1/get_items_by_cat_id?category_id=${id}`;
  let data = new FormData();
  data.append("category_id", id);
  axios({
  method: "get",
  url: my_url,
  data: data,

  }).then(function (response) {
    handleGetItemsByIdResponse(response);
  }).catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    }})
}

function handleGetItemsByIdResponse(response){
  if (response.data.items){
    let container = document.getElementById("container");
    container.innerHTML = "";
    response.data.items.forEach((item)=>{
      container.innerHTML += `<div class="card" id="${item.id}">
                                  <div class="card-img">
                                      <img src="" alt="">
                                  </div>
                                  <div class="card-footer">
                                      <div class="card-footer-txt">
                                          <p class="card-item-title">${item.name}</p>
                                          <p class="card-price">$${item.price}</p>
                                          <p class="card-description">${item.description}</p>
                                      </div>
                                      <div class="card-footer-heart">
                                          <i id="${item.id}" onClick="addToFavourite(this)" class="fa fa-thin fa-heart"></i>
                                      </div>
                                  </div>
                              </div>`
    })
  }
}