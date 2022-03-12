// global variables //

var mainContainerEl = document.getElementById("main-container");
var buttonEl = document.querySelector("#btn-search");
var cityInputEl = document.querySelector("#city_code");
var stateInputEl = document.querySelector("#state_code");
var radiusInputEl = document.querySelector("#radius");
var startDateInputEl = document.querySelector("#startDate");
var endDateInputEl = document.querySelector("#endDate");
var logoutEl = document.getElementById("logout");

//Global Variables used for Google Map Direction. 
var data2;
var stateCode2;
var latStart1;
var lngStart1;
var mapIdArray = [];
var mapVenueId = [];
var arrayObject = [];
var userInputArray = inputValue();

//checkForValidUserSession = > Function to validate user session. If user do not exist then redirect to login Page.
var checkForValidUserSession = function(){
    var currentUser = readLocalStorageKeyConvertToObject("CurrentUser");
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

//Check user session validity on Page load. 
checkForValidUserSession();

//logoutUser = > Function to logout from Current page and redirect to Login page. Check if user value entry exist in local storage. 
// On Logout set "CurrentUser" value as null on Local Storage. 
var logoutUser = function(){
    var currentUser = readLocalStorageKeyConvertToObject("CurrentUser");
    currentUser = "";
    storeObjectToLocalStorage("CurrentUser",currentUser);
    location.href = "index.html";
};

//Invoke logout User function on logout button click. 
logoutEl.addEventListener("click", logoutUser);


//formSubmitHandler => Function to get user input on Event Search Page. 
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  var city = cityInputEl.value.trim();
  

  if (city) {
    // pass the data to getUserRepos() as an argument
    getEventDetails(city);
    
  }  else {
    // alert("Please enter a city"); // need to replace with a modal or eliminate //
    modalFunction("Please enter a city");
  }
};



//displayEventDetails => Display Event Details results on Event Search Page. 
var displayEventDetails = function(data) {
    while (document.querySelector("#all-cards-container-container")) {
        var temp = document.querySelector("#all-cards-container-container");
        mainContainerEl.removeChild(temp);
    }
    

    for (var i=0; i < data._embedded.events.length ; i++){
        var eventName = data._embedded.events[i].name;
        var eventDate = data._embedded.events[i].dates.start.localDate;
        var eventTime = data._embedded.events[i].dates.start.localTime;
        var venueAddress = data._embedded.events[i]._embedded.venues[0].address.line1;
        var venueCity = data._embedded.events[i]._embedded.venues[0].city.name;
        var eventImage = data._embedded.events[i].images[3].url;

        // addition event information
        var eventId = data._embedded.events[i].id;
        var venuePostalCode = data._embedded.events[i]._embedded.venues[0].postalCode;

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


        addTitleButtonContainer (allCardsContainerWrapperEl, eventId, i, data._embedded.events[i],"tm");
        var elementID = cardContainer (allCardsContainerWrapperEl,i );
        imageCardContainer(elementID, eventId, i, data._embedded.events[i],"tm" );
        venueCardContainer (elementID, eventId, i, data._embedded.events[i],"tm","","");
        mapCardContainer(elementID, eventId, i, data._embedded.events[i], "tm" );

    }
  
};

// function to get starting latitude and longitude
var getLatLngStart = function(city, stateCode){

      var apiId = ""
      var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="+city+","+stateCode+"&key=" + apiId
   
      fetch(apiUrl)
      .then(function(response){
     
        if(response.ok){
          response.json().then(function(data){
            latStart1 = data.results[0].geometry.location.lat;
            lngStart1 = data.results[0].geometry.location.lng;
  
          });
        }
      });
    };

// function to find route, distance and time from starting city to venue location
var getMaps = function(){
    var h = 0;
    var myLoop = function() {
   
    var k = h+1;
    setTimeout(function(){

        var latEnd1 = data2._embedded.events[h]._embedded.venues[0].location.latitude;
        var lngEnd1 = data2._embedded.events[h]._embedded.venues[0].location.longitude;

        var elId = "map";
        var id = "#" + mapIdArray[h];
      

        calcRoute(parseFloat(latStart1),parseFloat(lngStart1),parseFloat(latEnd1),parseFloat(lngEnd1),mapIdArray[h]) 
        
        var idResults = mapVenueId[h];
        mapsDistanceAndTime(parseFloat(latStart1),parseFloat(lngStart1),parseFloat(latEnd1),parseFloat(lngEnd1), idResults);

        h++;
        if(h < data2._embedded.events.length){
        
        myLoop();
        }
     
    }, 1000);
    };
    myLoop();
    
};

//Function to fetch Event Details. 
var getEventDetails = function(city) {
  
  // The first fetch's query parameters are city and state so we receive latitude and longitude as output. 
  var stateCode = stateInputEl.value.trim();

  getLatLngStart(city,stateCode);
  var apiKey = 	"mKkhyOtOQMESD6z0EDhbvXEeQROG2FLc";
  var apiUrlTicketCity = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&stateCode=" + stateCode + "&apikey=" + apiKey + "";

  
  fetch(apiUrlTicketCity).then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var lat = data._embedded.events[0]._embedded.venues[0].location.latitude;
    var lon = data._embedded.events[0]._embedded.venues[0].location.longitude;
    var localStartDateTime = (startDateInputEl.value + "T00:00:00"); 
    var localEndDateTime = (endDateInputEl.value + "T23:59:59");
    var radius = radiusInputEl.value.trim();
    var unit = "miles"; // default setting is miles, so possibly remove this query parameter //
    var geoPoint = "9q924"; // leving this as an example in case we add geoHash logic //

    setTimeout(function(){
        var apiUrlTicketEvents = "https://app.ticketmaster.com/discovery/v2/events.json?latlong=" + lat + "," + lon + "&radius=" + radius + "&unit=" + unit + "&localStartEndDateTime=" + localStartDateTime + "," + localEndDateTime + "&apikey=" + apiKey + "";

        
        fetch(apiUrlTicketEvents).then(function(response) {
        return response.json()
        })
        .then(function(data) {
        
        // pass data to displayEventDetails
        displayEventDetails(data); 
        data2=data;
        getMaps();
        });
    },2000);
  });
};


// "click" to tigger citySearch()
buttonEl.addEventListener("click", formSubmitHandler);


//Below Code to store Event Details in local Storage. 

var eventTypeArray = [];
var eventArray = [];
var venueArray = [];
var users = [];

//Function to load User Data
var loadLocalUserData = function(){
    if (readLocalStorageKeyConvertToObject("Users") != null || readLocalStorageKeyConvertToObject("Users") != undefined) {
        users = readLocalStorageKeyConvertToObject("Users");
    }
};

//Function to load Event Data
var loadLocalEventData = function(){
    if (readLocalStorageKeyConvertToObject("Events") != null || readLocalStorageKeyConvertToObject("Events") != undefined) {
        eventArray = readLocalStorageKeyConvertToObject("Events");
    }
};

//Function to load Venue Data
var loadLocalVenueData = function(){
    if (readLocalStorageKeyConvertToObject("Venue") != null || readLocalStorageKeyConvertToObject("Venue") != undefined) {
        venueArray = readLocalStorageKeyConvertToObject("Venue");
    }
};

//Function to load Event Type Data
var loadLocalEventTypeData = function(){
    if (readLocalStorageKeyConvertToObject("EventType") != null || readLocalStorageKeyConvertToObject("EventType") != undefined) {
        eventTypeArray = readLocalStorageKeyConvertToObject("EventType");
    }
};

//Function to find User Index in Local Storage based on User ID. 
var findUserIndex = function(user, userId){
    var matchfound = null;
    for (var i = 0; i < user.length ; i++){
        if (user[i].id.trim() === userId){
            matchfound = i;
        } 
    }
    return matchfound;
};

//Function to find Venue Index in Local Storage based on Venue ID. 
var findVenueIndex = function(venue, venueId){
    var matchfound = null;
    for (var i = 0; i < venue.length ; i++){
        if (venue[i].venueId === venueId){
            matchfound = i;
        } 
    }
    return matchfound;
};

//Function to find Event Index in Local Storage based on Event ID. 
var findEventIndex = function(event, eventId){
    var matchfound = null;
    for (var i = 0; i < event.length ; i++){
        if (event[i].eventId.trim() === eventId.trim()){
            matchfound = i;
        } 
    }
    return matchfound;
};

//Function to check if Event already added as part of User Interested Event list
var findEventTypeIDInUser = function(user, eventId){
    var matchfound = null;
    for (var i = 0; i < user.eventId.length ; i++){
            if (user.eventId[i].trim() === eventId.trim()){
                matchfound = i;
                break;
            }
    }
    return matchfound;
};


   var stateCode = "ca";
   var apiKey = 	"mKkhyOtOQMESD6z0EDhbvXEeQROG2FLc";
   var baseTicketMaster = "https://app.ticketmaster.com/discovery/v2/events/"

   var buttonElement = document.querySelector(".button-test");
   

  var addEventDetail = function(eventId) {
  var eventURL = baseTicketMaster + eventId + ".json?apikey=" + apiKey;

    
    fetch(eventURL).then(function(response) {
      return response.json();
    })
    .then(function(data) {
    
      var tempVenueId = [];
      
      //Store Venue data in local Storage. 
      if (data._embedded.venues.length != 0){    
        for (var i=0; i < data._embedded.venues.length ; i++ ){
            loadLocalVenueData(); 
            var venueArrayLength = venueArray.length; //Get the last index of Venue Array to insert Data.
            //Retrieve Venue index of Venue ID if it already exist in our local Storage Venue Object table.
            var venueIndex = findVenueIndex(venueArray,data._embedded.venues[i].id);
            //If venue index is null then enter Venue data in venue table else store Venue ID in local variable to append in Event table. 
            if (venueIndex == null){
                venueArray.push(venue());
                venueArray[venueArrayLength].id = uuidGenerator();
                venueArray[venueArrayLength].name = data._embedded.venues[i].name;
                venueArray[venueArrayLength].venueId = data._embedded.venues[i].id;
                venueArray[venueArrayLength].postalCode = data._embedded.venues[i].postalCode;
                venueArray[venueArrayLength].timeZone = data._embedded.venues[i].timeZone;
                venueArray[venueArrayLength].city = data._embedded.venues[i].city.name;
                venueArray[venueArrayLength].stateName = data._embedded.venues[i].state.name;
                venueArray[venueArrayLength].stateCode = data._embedded.venues[i].state.stateCode;
                venueArray[venueArrayLength].countryName = data._embedded.venues[i].country.name;
                venueArray[venueArrayLength].countryCode = data._embedded.venues[i].country.countryCode;
                venueArray[venueArrayLength].address = data._embedded.venues[i].address;
                venueArray[venueArrayLength].longitude = data._embedded.venues[i].location.longitude;
                venueArray[venueArrayLength].latitude = data._embedded.venues[i].location.latitude;
                storeObjectToLocalStorage("Venue", venueArray);
                tempVenueId.push(venueArray[venueArrayLength].id);
            } else {
                tempVenueId.push(venueArray[venueIndex].id);
            }
        }
      }

      var temp_event_id = "";

      //Store Event Info in Event Object Table in local Storage. We do not store duplicate entry for same Event ID. 
      if (data.name != null){
         loadLocalEventData();
         var eventArrayLength = eventArray.length;
         var eventIndex = findEventIndex(eventArray,data.id);
         if (eventIndex == null){
            eventArray.push(event());
            eventArray[eventArrayLength].id = uuidGenerator();
            eventArray[eventArrayLength].name = data.name;
            eventArray[eventArrayLength].eventId = data.id;
            eventArray[eventArrayLength].locale = data.locale;
            eventArray[eventArrayLength].eventURl = data.images[3].url;
            eventArray[eventArrayLength].startDate = data.dates.start.localDate;
            eventArray[eventArrayLength].localTime = data.dates.start.localTime;
            eventArray[eventArrayLength].eventType = data.type;
            eventArray[eventArrayLength].popularityIndex = 1;
            for (var j = 0; j < tempVenueId.length ; j++ ){
                eventArray[eventArrayLength].venueId.push(tempVenueId[j]);
            }
            temp_event_id = eventArray[eventArrayLength].id;
        }else {
            eventArray[eventIndex].popularityIndex = eventArray[eventIndex].popularityIndex + 1;
            temp_event_id = eventArray[eventIndex].id;
        }
         
         storeObjectToLocalStorage("Events", eventArray);
      }

      //Retrieve Current User Id from Local Storage. 
      var currentUser = readLocalStorageKeyConvertToObject("CurrentUser");
      loadLocalUserData();
      var user_index = findUserIndex(users, currentUser);
      if (user_index != null){
            if (findEventTypeIDInUser (users[user_index], temp_event_id) == null) {
                users[user_index].eventId.push(temp_event_id);
            }
      }
      storeObjectToLocalStorage("Users",users);
    });
  };

 
  var addEvent = function(event){
    if (event.target.id.includes("addEventBtn")){
        var tempEle = document.getElementById(event.target.id);
        var eventId =  tempEle.getAttribute("data");    
        addEventDetail(eventId);
    }
  };
  
  mainContainerEl.addEventListener("click", addEvent);
