var userprofilerowEle = document.querySelector("#userprofilerow");
var addressrowEle = document.querySelector("#addressrow");

var addressheaderEle = document.querySelector("#addressheader");
var userprofileheaderEle = document.querySelector('#userprofileheader');

var saveUserProfileButton = document.querySelector("#saveUserProfileButton");
var saveUserAddressButton = document.querySelector("#saveUserAddressButton");
var logoutEl = document.getElementById("logout");


var firstNameDivEle = document.querySelector("#first_name");
var middleNameDivEle = document.querySelector("#middle_name");
var lastNameDivEle = document.querySelector("#last_name");
var emailDivEle = document.querySelector("#email");
var passwordDivEle = document.querySelector("#password");

var addressEle = document.querySelector("#address");
var citynameEle = document.querySelector("#city_name");
var countryEle = document.querySelector ("#country");
var pincodeEle = document.querySelector ("#pincode");


var checkForValidUserSession = function(){
    var currentUser = readLocalStorageKeyConvertToObject("CurrentUser");
    console.log(currentUser);
    if (currentUser != null || currentUser != undefined) {
        if (currentUser.length == 0  ){
            modalFunction("Session Expired. Please login with Valid User. Redirecting to Login Page.");
            location.href = "index.html";
        }
    } else {
        modalFunction("Session Expired. Please login with Valid User. Redirecting to Login Page.");
        location.href = "index.html";
    }
};

checkForValidUserSession();

var logoutUser = function(){
    var currentUser = readLocalStorageKeyConvertToObject("CurrentUser");
    currentUser = "";
    storeObjectToLocalStorage("CurrentUser",currentUser);
    location.href = "index.html";
};

logoutEl.addEventListener("click", logoutUser);

var users = [];
var userIndex = "";

var loadLocalUserData = function(){
    if (readLocalStorageKeyConvertToObject("Users") != null || readLocalStorageKeyConvertToObject("Users") != undefined) {
        users = readLocalStorageKeyConvertToObject("Users");
    }
};

//Function to search user index based on user ID entered by User. 
var searchUserIndex = function(userId){
    //var match = 0;
    for(var i =0; i < users.length ; i++){
        if(users[i].id === userId){
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


//load user profile on page load. 
var modifyUserProfile = function(){
    addressrowEle.style.display = "None";
    userprofilerowEle.style.display = "block";

    loadLocalUserData();
    var currentUser = readLocalStorageKeyConvertToObject("CurrentUser");
    var user_index = searchUserIndex(currentUser);

    var userFirstName = users[user_index].firstName;

    var userMiddleName = users[user_index].middlename;

    var userLastName = users[user_index].lastName;

    var userEmail = users[user_index].email;

    var userPassword = users[user_index].passwd;


    firstNameDivEle.value= userFirstName;
    lastNameDivEle.value = userLastName;
    emailDivEle.value = userEmail;
};

//Load basic user profile on page load. 
modifyUserProfile();


userprofileheaderEle.addEventListener("click",modifyUserProfile);

var updateUserProfile = function(event){
    addressrowEle.style.display = "None";
    userprofilerowEle.style.display = "block";
    var password = "";
    var confirmPassword = "";
    event.preventDefault();
    var currentUser = readLocalStorageKeyConvertToObject("CurrentUser");
    var user_index = searchUserIndex(currentUser);

    var userFirstName = getInputValue("#first_name");
    var userLastName = getInputValue("#last_name");

    users[user_index].firstName = userFirstName;
    users[user_index].lastName = userLastName;

    storeObjectToLocalStorage("Users", users);
    modalFunction(users[user_index].email + " profile successfully modified.");
};

saveUserProfileButton.addEventListener("click",updateUserProfile);



var modifyAddress = function(){
    userprofilerowEle.style.display = "none";
    addressrowEle.style.display = "block";
    loadLocalUserData();
    var currentUser = readLocalStorageKeyConvertToObject("CurrentUser");
    var user_index = searchUserIndex(currentUser);

    var userAddress = users[user_index].address;
    var userCity = users[user_index].city;
    var userCountry = users[user_index].country;
    var userPincode = users[user_index].pincode;

    addressEle.value = userAddress;
    citynameEle.value = userCity;
    countryEle.value = userCountry;
    pincodeEle.value = userPincode;
};

addressheaderEle.addEventListener("click",modifyAddress);

var updateAddress = function(event){
    userprofilerowEle.style.display = "none";
    addressrowEle.style.display = "block";
    event.preventDefault();

    loadLocalUserData();
    var currentUser = readLocalStorageKeyConvertToObject("CurrentUser");
    var user_index = searchUserIndex(currentUser);

    users[user_index].address = getInputValue("#address");
    users[user_index].city = getInputValue("#city_name");
    users[user_index].country = getInputValue("#country");
    users[user_index].pincode = getInputValue("#pincode")

    storeObjectToLocalStorage("Users", users);
    modalFunction(users[user_index].email + " address successfully modified.");
};


saveUserAddressButton.addEventListener("click",updateAddress);








