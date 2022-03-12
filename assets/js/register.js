//This file contain code for Registration. 

var modalEle = document.querySelector(".modal1");
var modalHeaderEle = document.querySelector(".modal-header");
var modalParaEle = document.querySelector("modal-para");
var submitEle = document.querySelector(".btn");
var users = [];

var loadLocalUserData = function(){
    if (readLocalStorageKeyConvertToObject("Users") != null || readLocalStorageKeyConvertToObject("Users") != undefined) {
        users = readLocalStorageKeyConvertToObject("Users");
    }
};



var searchUserArray = function(searchItem){
    var match = 0;
    for(var i =0; i < users.length ; i++){
        if(users[i].email === searchItem){
            match ++;
            break;
        }
    }
    if (match > 0){
        return "1";
    } else {
        return "0";
    }

};

//Common function to retrieve form input value. 
function getInputValue(id){
    if (id.length != 0) {
        if (id != null || id != "" || id != undefined){
            var inputVal = document.querySelector(id).value;
            if (inputVal != null || inputVal != undefined || inputVal != ""){
                return inputVal;
            }
        } else {
            return null;
        }
    } else {
        return id.length;
    }
}

var createUserProfile = function(event){
    event.preventDefault();
    loadLocalUserData();
    var userLength = users.length;
    users.push(userProfile());

    users[userLength].id = uuidGenerator();
    //Read First Name from Login page
    if (getInputValue("#first_name") != 0){
        if (getInputValue("#first_name") != null || getInputValue("#first_name") != ""){
            users[userLength].firstName = getInputValue("#first_name");
        } else{
            users.pop();
            modalFunction("First Name is Mandatory. Please enter and submit again.");
            return;
        }
    } else {
        users.pop();
        modalFunction("First name can not be blank. Please enter and submit again.");
        return;
    }   

    if (getInputValue("#last_name") != 0){
        if (getInputValue("#last_name") != null || getInputValue("#last_name") != ""){
            users[userLength].lastName = getInputValue("#last_name");
        }else{
            users.pop();
            modalFunction("Last Name is Mandatory. Please enter and submit again.");
            return; 
        }
    } else {
        users.pop();
        modalFunction("Last Name is Mandatory. Please enter and submit again.");
        return;
    }
    
    console.log("Value of Email Input Value = " + getInputValue("#email"));
    if (getInputValue("#email") != 0){
        if (getInputValue("#email") != null || getInputValue("#email") != ""){
            console.log("Value of searchUserArray =" + searchUserArray(getInputValue("#email")));
            console.log(users);
            if (searchUserArray(getInputValue("#email")) === "1"){
                users.pop();
                modalFunction("Account with this email ID already exist. Please use different Email ID.");
                return;
            } else{
                users[userLength].email = getInputValue("#email");
            }
        }else{
            users.pop();
            modalFunction("Email is Mandatory. Please enter and submit again.");
            return;
        }
    } else {
        users.pop();
        modalFunction("Email is Mandatory. Please enter and submit again.");
        return;
    }
    
    if (getInputValue("#password") != 0){
        if (getInputValue("#password") != null || getInputValue("#password") != ""){
            users[userLength].passwd = getInputValue("#password");
        }else{
            users.pop();
            modalFunction("Password is Mandatory. Please enter and submit again.");
            return;
        }
    }else {
        users.pop();
        modalFunction("Password is Mandatory. Please enter and submit again.");
        return;
    }
    
    if (getInputValue("#password") != 0){
        if (getInputValue("#confirmpassword") != null || getInputValue("#confirmpassword") != ""){
            if (getInputValue("#confirmpassword") == getInputValue("#password")){
                users[userLength].passwd = getInputValue("#password");
            } else{
                users.pop();
                modalFunction("Password and confirm password should be same.");
            }
        } else {
            users.pop();
            modalFunction("All fields are mandatory.");
            return;
        }
    } else {
        users.pop();
        modalFunction("Confirm Password is Mandatory. Please enter and submit again.");
        return;
    }

    console.log(users); 
    storeObjectToLocalStorage("Users", users);
    location.href = "eventsearch.html?q=" + users[userLength].id;
    storeObjectToLocalStorage("CurrentUser", users[userLength].id );
};


submitEle.addEventListener("click",createUserProfile);
