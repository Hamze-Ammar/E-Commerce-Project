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
    // get and display categories in  select tag
    fetchCategories();
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
        token = 'Bearer ' + localStorage.getItem("access_token");
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

// Add Category

let submit_new_category = document.getElementById("submit-new-category");
let msg = document.getElementById("msg");
let response_request = document.getElementById("response");
let token = 'Bearer ' + localStorage.getItem("access_token");


submit_new_category.onclick = function(e){
    // Clear some html
    msg.innerHTML = "";
    response_request.innerHTML = "";

    e.preventDefault();
    let category_name = document.getElementById("category_name").value;
    let category_description = document.getElementById("category_description").value;
    if (!category_name || !category_description){
        msg.innerHTML = "Missing info, all fields are required";
        return
    }
    

    let my_url = 'http://127.0.0.1:8000/api/v1/admin/add_category';

    let data = new FormData();
    data.append('name', category_name);

    let headers = {};
    headers.Authorization = token;
    axios({
    method: "post",
    url: my_url,
    data: data,
    headers: headers,

    }).then(function (response) {
        handleResponseCategories(response);
    });
}

function handleResponseCategories(response){
    if (response.data.status=='Success'){
        response_request.innerHTML = 'A new category has been succefully added!';
    }
    else{
        console.log(response.data.status);
        return
    }
    document.getElementById("category_name").value = "";
    document.getElementById("category_description").value = "";
}


// ===== Get and display Categories

function fetchCategories(){
    // Call the get categories api
    let my_url= "http://127.0.0.1:8000/api/v1/admin/get_categories";
    let headers = {};
    headers.Authorization = token;
    axios({
        method: "get",
        url: my_url,
        headers: headers,
    
        }).then(function (response) {
            displayCategories(response);
        }).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              alert("Please Sign In!")
              console.log(error.response.status);
              if(error.response.status=='401'){
                alert("Invalid email or password");
              }
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } });
}

function displayCategories(response) {
    if (response.data.status!=="Success"){
        //error
        console.log(response);
        return
    }
    const categories = response.data.response;
    let select_element = document.getElementById("select-categories");
    categories.forEach((category)=>{
        select_element.innerHTML += `<option id="${category.id}" value="${category.name}">${category.name}</option>`;
    });
}


// directly pass selected value to function in onchange!
let selected_item_category = "";
function getSelectedCategoryId(option) {
    selected_item_category = option.id;
}

// submit new item
let submit_new_item = document.getElementById("submit-new-item");

submit_new_item.onclick = function(e){
    // Clear some html
    let msg = document.getElementById("msg-item");
    let response = document.getElementById("response-item");
    msg.innerHTML = "";
    response.innerHTML = "";

    e.preventDefault();
    let item_name = document.getElementById("item_name").value;
    let item_price = document.getElementById("item_price").value;
    let item_description = document.getElementById("item_description").value;
    let item_category_id = selected_item_category;
    let profile = document.getElementById('fileToUpload');
    if (!item_name || !item_price || !item_description || !item_category_id || profile.files.length == 0){
        msg.innerHTML = "Missing info, all fields are required";
        return
    }
    var base64String = "";
    const selectedFile = profile.files[0];
    var reader = new FileReader();

    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
          .replace(/^.+,/, "");
        console.log(base64String);

        let my_url = 'http://127.0.0.1:8000/api/v1/admin/add_item';

        let data = new FormData();
        data.append('name', item_name);
        data.append('price', item_price);
        data.append('category_id', item_category_id);
        data.append('description', item_description);
        //data.append("image", base64String);

        let headers = {};
        headers.Authorization = token;
        axios({
        method: "post",
        url: my_url,
        data: data,
        headers: headers,

        }).then(function (response) {
            handleResponseItems(response);
        });
    }
    reader.readAsDataURL(selectedFile);
}

function handleResponseItems(response){
    if (response.data.status!=="Success"){
        //error
        console.log(response);
        return
    }else{
        document.getElementById("response-item").innerHTML = 'A new item has been succefully added!';
    }
    document.getElementById("item_name").value = "";
    document.getElementById("item_price").value = "";
    document.getElementById("item_description").value = "";
    document.getElementById("select-categories").value = "";
}


// Log out ==========
let logout = document.getElementById("logout");
logout.onclick = function (){
    let my_token = localStorage.getItem("access_token");
    if (my_token==null){
        alert("You are already logged out");
        return
    }
    let my_url = 'http://127.0.0.1:8000/api/v1/user/logout';
    let headers = {};
    headers.Authorization = token;
    axios({
    method: "post",
    url: my_url,
    headers: headers,

    }).then(function (response) {
        handleResponseLogout(response);
    });
}

function handleResponseLogout(response){
    if (response.statusText=='OK'){
        localStorage.removeItem("access_token");
        alert(response.data.message);
    }
    else{
        console.log("Something went wrong");
        console.log(response);
    }
}

