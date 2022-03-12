//This file contains code for Saved Event Page. 

var mainContainerEl = document.getElementById("main-container");
var logoutEl = document.getElementById("logout");
var savedEventheader = document.getElementById("savedEventheader");

var eventArray = [];
var venueArray = [];
var users = [];


//Function to check for valid User session
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

//Invoke valid User session on page load. 
checkForValidUserSession ();

//Invoke Lougout User session. 
var logoutUser = function(){
    var currentUser = readLocalStorageKeyConvertToObject("CurrentUser");
    currentUser = "";
    storeObjectToLocalStorage("CurrentUser",currentUser);
    location.href = "index.html";
};

logoutEl.addEventListener("click", logoutUser);

var updateHeaderUserDetail = function(userName){
    savedEventheader.textContent = userName + " - Interested Event List"; 
}


var loadLocalUserData = function(){
    if (readLocalStorageKeyConvertToObject("Users") != null || readLocalStorageKeyConvertToObject("Users") != undefined) {
        users = readLocalStorageKeyConvertToObject("Users");
    }
};

var loadLocalEventData = function(){
    if (readLocalStorageKeyConvertToObject("Events") != null || readLocalStorageKeyConvertToObject("Events") != undefined) {
        eventArray = readLocalStorageKeyConvertToObject("Events");
    }
};

var loadLocalVenueData = function(){
    if (readLocalStorageKeyConvertToObject("Venue") != null || readLocalStorageKeyConvertToObject("Venue") != undefined) {
        venueArray = readLocalStorageKeyConvertToObject("Venue");
    }
};

//Function to search Venue Index. 
var searchVenueIndex = function(venueId){
    var venueIndex = 0;
    for(var i =0; i < venueArray.length ; i++){
        if(venueArray[i].id === venueId){
            venueIndex = i;
            return venueIndex;
        }
    }
    return null;
};

//Function to search Event Index. 
var searchEventIndex = function(eventId){
    var eventIndex = 0;
    for(var i =0; i < eventArray.length ; i++){
        if(eventArray[i].id === eventId){
            eventIndex = i;
            return eventIndex;
        }
    }
    return null;
};

//Function to search User Index. 
var searchUserIndex = function(userId){
    var userIndex = 0;
    for(var i =0; i < users.length ; i++){
        if(users[i].id === userId){
            userIndex = i;
            return userIndex;
        }
    }
    return null;
};

//Function to populate saved user list. 
var populateUserSavedEvent = function(){
    var currentUser = readLocalStorageKeyConvertToObject("CurrentUser");
    loadLocalUserData();
    loadLocalEventData();
    loadLocalVenueData();
    var user_index = searchUserIndex(currentUser);
    if (user_index != null){
        updateHeaderUserDetail(users[user_index].firstName + " " + users[user_index].lastName);
        for (var i=0; i < users[user_index].eventId.length; i++){
            var allCardsContainerWrapperEl = document.createElement("div");
            allCardsContainerWrapperEl.className = ("col s12");
            allCardsContainerWrapperEl.id = ("all-cards-container-container");
            if (findOddEven(i) == "odd"){
                allCardsContainerWrapperEl.style.backgroundColor = "#fce4ec";
            } else {
                allCardsContainerWrapperEl.style.backgroundColor = "#f3e5f5";
            }
            allCardsContainerWrapperEl.style.alignItems = ("center");
            mainContainerEl.appendChild(allCardsContainerWrapperEl);

            // all cards container //
            var allCardsContainerEl = document.createElement("div");
            allCardsContainerEl.className = ("row");
            allCardsContainerEl.id = ("all-cards-container");
            allCardsContainerEl.style.width = ("100%");
            allCardsContainerWrapperEl.appendChild(allCardsContainerEl);
            var eventIndex =   searchEventIndex(users[user_index].eventId[i]);
            if (eventIndex != null){
                addTitleButtonContainer (allCardsContainerEl, users[user_index].eventId[i], i, eventArray[eventIndex], "local");
                var tempEle = cardContainer (allCardsContainerEl, i);
                var eventDate = eventArray[eventIndex].startDate;
                var eventTime = eventArray[eventIndex].localTime;
                var venueIndex = searchVenueIndex(eventArray[eventIndex].venueId[0]);
                venueCardContainer(tempEle, users[user_index].eventId[i], i, venueArray[venueIndex], "local", eventDate, eventTime);
                imageCardContainer (tempEle, users[user_index].eventId[i], i, eventArray[eventIndex], "local");
            } else {
                modalFunction ("User has not selected any Events. No events to display.");
            }   
        }

    } else {
        modalFunction ("User do not exist in system.");
    }
};

populateUserSavedEvent();