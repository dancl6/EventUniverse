//This file contains code for Forget Password flow. 

var submitEle = document.querySelector(".btn");
var emailDivEle = document.querySelector(".email-container");
var passwdDivEle = document.querySelector(".password-container");
var confirmpasswdDivEle = document.querySelector(".confirmpassword-container");
var emailEle = document.querySelector("#email");

var users = [];
var userIndex = "";

var loadLocalUserData = function(){
    if (readLocalStorageKeyConvertToObject("Users") != null || readLocalStorageKeyConvertToObject("Users") != undefined) {
        users = readLocalStorageKeyConvertToObject("Users");
    }
};

var searchUserIndex = function(emailID){
    for(var i =0; i < users.length ; i++){
        if(users[i].email === emailID){
            userIndex = i;
            return userIndex;
        }
    }
    return null;
};

//Common function to retrieve form input value. 
function getInputValue(id){
    console.log(id.length);
    if (id.length != 0) {
        if (id != null || id != undefined || id!= ""){
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

var resetPassword = function(event){
    var password = "";
    var confirmPassword = "";

    event.preventDefault();
    loadLocalUserData();

    if (getInputValue("#email") != 0){
        if (getInputValue("#email") != null || getInputValue("#email") != ""){
            userIndex  = searchUserIndex(getInputValue("#email"));
            if (userIndex == null){
                modalFunction("User do not exist in system. Please provide valid User Id");
                return ;
            }
        }else{
            modalFunction("Email field can not be null. Please enter valid email Id.");
            return;
        }
    } else {
        modalFunction("Email Field can not be black. Please enter valid Id.");
        return;
    }



    if (getInputValue("#password") != 0){
            if (getInputValue("#password") != null || getInputValue("#password") != ""){
                password = getInputValue("#password");
            }
        }else{
            // alert("Please enter valid password.");
            modalFunction("Please enter valid password.");
            emailEle.textContent = "";
            emailEle.setAttribute("id","email");
            return;
        }

    if (getInputValue("#confirmpassword") != 0){
        if (getInputValue("#confirmpassword") != null || getInputValue("#confirmpassword") != ""){
            confirmPassword = getInputValue("#confirmpassword");
            if (confirmPassword != password){
                modalFunction(" Confirm Password do not match with Password. Please enter valid confirm Password");
            } else {
                users[userIndex].passwd = password;
                storeObjectToLocalStorage("Users", users);
                location.href = "login.html";
            }
        }
        }else{
            modalFunction("Please enter valid confirm password.");
            return;
        }
    
};


submitEle.addEventListener("click",resetPassword);