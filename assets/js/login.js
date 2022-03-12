//This file contains code for Login Page. 

var submitEle = document.querySelector(".btn");
var users = [];
var userIndex = 0;

var loadLocalUserData = function(){
    if (readLocalStorageKeyConvertToObject("Users") != null || readLocalStorageKeyConvertToObject("Users") != undefined) {
        users = readLocalStorageKeyConvertToObject("Users");
    }
};

var searchUserIndex = function(emailID){
    //var match = 0;
    for(var i =0; i < users.length ; i++){
        if(users[i].email === emailID){
            userIndex = i;
            return userIndex;
        }
    }
    return null;
};

//Function to retrieve form input value. 
function getInputValue(id){
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

//Function to Authenticate User. 
var authenticateUser = function(event){
    event.preventDefault();
    loadLocalUserData();
    var index = "";

    if (getInputValue("#email") != 0){
        if (getInputValue("#email") != null || getInputValue("#email") != ""){
            index  = searchUserIndex(getInputValue("#email"));
            if (index == null){
                modalFunction("User do not exist in system. Please create a new profile using Register Link");
                return;
            }
        }else{
            modalFunction("Email field can not be null. Please enter valid email Address.");
            return;
        }
    } else {
        modalFunction("Email Field can not be black. Please enter valid data.");
        return;
    }
    
    if (getInputValue("#password") !=0) {
        if (getInputValue("#password") != null || getInputValue("#password") != ""){
            if (users[index].passwd === getInputValue("#password")){
                location.href = "eventsearch.html?q=" + users[index].id;
                storeObjectToLocalStorage("CurrentUser", users[index].id);
            } else {
                modalFunction("Password did not match. Please enter right password  and submit again.");
                return;
            }
        }else{
            modalFunction("Password is Mandatory. Please enter and submit again.");
            return;
        }
    }else {
        modalFunction("Password Field is Mandatory for login. Please enter and submit again.");
    }
};


submitEle.addEventListener("click",authenticateUser);