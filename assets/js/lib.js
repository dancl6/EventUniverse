// The main objective of this file is to define common functions for this program.

"use strict"

/* uuidGenerator => Function to generate Unique Id*/
function uuidGenerator (){
    let len = 20;
    parseInt((Math.random() * 20 + 1) * Math.pow(10,len-1), 10);   
    let uniquenumber = Date.now().toString(36) + ((Math.random() * 34 + 1) * Math.pow(10,len-1)).toString(36).substr(2,34).toUpperCase();
    return uniquenumber;
  };

/* storeObjectToLocalStorage => Function to store object in Local storage in string format */
function storeObjectToLocalStorage (key, value){
    if (value != null || key != null ){
        let value_serialize =  JSON.stringify(value);
        window.localStorage.setItem (key, value_serialize);
            return 1;
    } else {
        return 0;
    }
};

/* readLocalStorageKeyConvertToObject => Function to read local storage key value pair in string format, convert into Object and return the object*/
function readLocalStorageKeyConvertToObject (key){
    let value_deserialize =  JSON.parse(window.localStorage.getItem(key));
    return value_deserialize;
};

/* Function to read local storage key value pair in string format, convert into Object and return the object*/
function removeItemFromLocalStorage (key){
    window.localStorage.removeItem(key);
};

var findPopularityIndexValue = function(eventId){
    var eventarray = [];
    var matchfound = null;
    if (readLocalStorageKeyConvertToObject("Events") != null || readLocalStorageKeyConvertToObject("Events") != undefined) {
        eventarray = readLocalStorageKeyConvertToObject("Events");
    }
    if (eventarray.length != 0){
        for (var i = 0; i < eventarray.length ; i++){
            if (eventarray[i].eventId.trim() === eventId.trim()){
                matchfound = eventarray[i].popularityIndex;
            } 
        }
    }
    return matchfound;
};

//addTitleButtonContainer => Function to populate Event Title, Save Button and Popularity Button. 

var addTitleButtonContainer = function (parentEl, eventId, parentId, data, datatype){
    // ** Event Title and Add Button ** //
  if (datatype != "local"){
    var eventName = data.name;
    var eventDate = data.dates.start.localDate;
    var eventTime = data.dates.start.localTime;
    var eventId = data.id;
    var venueAddress = data._embedded.venues[0].address.line1;
    var venueCity = data._embedded.venues[0].city.name; 
    var venuePostalCode = data._embedded.venues[0].postalCode;
    var eventImage = data.images[3].url;
  } else {
    var eventName = data.name;
    var eventDate = data.startDate;
    var eventTime = data.localTime;
    var eventId = data.id;
    
  }
    //If dataType is local then read popularity Index from Event Array. 
    if (datatype == "local"){
        var value = data.popularityIndex;
    }  else {
        var value = findPopularityIndexValue(eventId);
        
     } 

    // If value is null then set Popularity Index as 0 else read the value. 
    if (value == null){
        var popularityIndex = 0;
    } else {
        var popularityIndex = value;
    }

  // event title & add event button container //
  var eventTitleButtonContainerEl = document.createElement("div");
  eventTitleButtonContainerEl.className = ("row");
  eventTitleButtonContainerEl.setAttribute ( "id", "event-title-button-container" + parentId);
  eventTitleButtonContainerEl.style.width = "100%";
  eventTitleButtonContainerEl.style.marginLeft = ".25rem";
  eventTitleButtonContainerEl.style.marginRight = ".25rem";
  parentEl.appendChild(eventTitleButtonContainerEl);
  
  // event title container //
  var eventTitleContainerEl = document.createElement("div");
  eventTitleContainerEl.className = ("col s12 m6 l6");
  eventTitleContainerEl.setAttribute ("id","event-title-container" + parentId);
  eventTitleContainerEl.style.paddingLeft = "1rem";
  eventTitleButtonContainerEl.appendChild(eventTitleContainerEl);
    
  // event title //
  var eventHeaderEl = document.createElement("h4");
  eventHeaderEl.className = ("header`x");
  eventHeaderEl.setAttribute ("id","event-title" + parentId);
  eventHeaderEl.style.display = "inline";
  eventHeaderEl.style.flexWrap = "wrap";
  //eventHeaderEl.style.paddingLeft = "1rem";
  eventHeaderEl.innerHTML = eventName;
  eventTitleContainerEl.appendChild(eventHeaderEl);

  // Populate Add Button ONLY on Event Search Page. 
  if(datatype != "local") {
    
    var addEventBtnContainerEl = document.createElement("div");
    addEventBtnContainerEl.className = ("col s12 m3 l3 right");
    addEventBtnContainerEl.setAttribute ("id","addEventBtnContainer" + parentId);
    addEventBtnContainerEl.style.paddingLeft = "1rem";
    addEventBtnContainerEl.style.display = "inline";
    addEventBtnContainerEl.style.flexWrap = "wrap";
    addEventBtnContainerEl.style.paddingTop = "5px";
    eventTitleButtonContainerEl.appendChild(addEventBtnContainerEl);
    
    // Add Button Container
    var addEventBtnEl = document.createElement("button");
    addEventBtnEl.className = ("btn waves-effect waves-light");
    addEventBtnEl.setAttribute ("id","addEventBtn" + parentId);
    addEventBtnEl.setAttribute ("data",eventId);
    addEventBtnEl.type = ("submit");
    addEventBtnEl.name = ("action");
    addEventBtnEl.innerHTML = ("Save Event");
    addEventBtnContainerEl.appendChild(addEventBtnEl);
}

  //Populate Display Container Code. 
   var addPopularityIndexContainerEl = document.createElement("div");
   addPopularityIndexContainerEl.className = ("col s12 m3 l3 right");
   addPopularityIndexContainerEl.setAttribute ("id","addPopularityIndexContainerEl" + parentId);
   addPopularityIndexContainerEl.style.display = "inline";
   addPopularityIndexContainerEl.style.flexWrap = "wrap";
   addPopularityIndexContainerEl.style.paddingLeft = "1rem";
   addPopularityIndexContainerEl.style.paddingTop = "10px";
   eventTitleButtonContainerEl.appendChild(addPopularityIndexContainerEl);
        
   
    var addPopularityEl = document.createElement("h5");
    addPopularityEl.className = ("header`x");
    addPopularityEl.setAttribute ("id","popularity-title" + parentId);
    addPopularityEl.textContent = "Popularity : " + popularityIndex ;
    addPopularityEl.style.verticalAlign = "top";
    addPopularityEl.style.marginTop = "0";
    addPopularityIndexContainerEl.appendChild(addPopularityEl);

};

//CardContainer => Create parent container object to hold Image, Venue and Map Card containers. 
var cardContainer = function (parentEl, parentId){
  var allCardContainerEl = document.createElement("div");
  allCardContainerEl.className = ("row");
  allCardContainerEl.setAttribute ( "id", "cards-container" + parentId);
  allCardContainerEl.style.width = "100%";
  allCardContainerEl.style.marginLeft = ".25rem";
  parentEl.appendChild(allCardContainerEl);
  return allCardContainerEl;
};

//venueCardContainer => Function to create Venue Card 
var venueCardContainer = function  (parentEl, eventId, parentId, data, datatype,eventdate, eventtime){
    if (datatype != "local"){
        var eventDate = data.dates.start.localDate;
        var eventTime = data.dates.start.localTime;
        var venueAddress = data._embedded.venues[0].address.line1;
        var venueCity = data._embedded.venues[0].city.name; 
        var venuePostalCode = data._embedded.venues[0].postalCode;
      } else {
        var eventDate = eventdate;
        var eventTime = eventtime;
        var venueAddress = data.address.line1;
        var venueCity = data.city; 
        var venuePostalCode = data.postalCode;
      }
    
    var venueCardContainerWrapperEl = document.createElement("div");

    if (datatype != "local"){
        venueCardContainerWrapperEl.className = "center col s12 m4 l4";
    } else {
        venueCardContainerWrapperEl.className = "center col s12 m6 l6";
    }
    venueCardContainerWrapperEl.setAttribute ("id","venue-card-container-container" + parentId);
    parentEl.appendChild(venueCardContainerWrapperEl);

    // venue card container //
    var venueCardContainerEl = document.createElement("div");
    venueCardContainerEl.className = "card small light-blue darken-2";
    venueCardContainerEl.setAttribute ("id","venue-card-container" + parentId);
    venueCardContainerEl.style.borderRadius = "25px";
    venueCardContainerWrapperEl.appendChild(venueCardContainerEl);

    // venue card //
    var venueCardEl = document.createElement("div");
    venueCardEl.className = "card-content white-text";
    venueCardEl.setAttribute ("id","venue-card" + parentId);
    venueCardEl.style.height = "100%";
    venueCardEl.style.padding = ("0px 5px 0px 5px");
    venueCardEl.style.textAlign = ("left");
    venueCardEl.style.borderRadius = "25px";
    venueCardContainerEl.appendChild(venueCardEl);

    // venue span - card title //
    var venueCardSpanEl = document.createElement("span");
    venueCardSpanEl.className = "venue-card-title";
    venueCardSpanEl.setAttribute ("id","venue-card-title" + parentId);
    venueCardSpanEl.innerHTML = ("Venue Details");
    venueCardSpanEl.style.fontSize = "22px";
    venueCardSpanEl.style.width = "100%";
    venueCardSpanEl.style.textAlign = "center";
    venueCardSpanEl.style.display = "flex";
    venueCardSpanEl.style.justifyContent = "center";
    venueCardEl.appendChild(venueCardSpanEl);

    // venue info used for appending event / venue details //
    var venueInfoEl = document.createElement("ul");
    venueInfoEl.className = "venue-info";
    venueInfoEl.setAttribute ("id","venue-info" + parentId);
    venueCardEl.appendChild(venueInfoEl);
    
    // venue address //
    var venueAddressEl = document.createElement("li");
    venueAddressEl.className = "venue-address";
    // venueAddress.setAttribute ("id","venue-address" + parentId);
    venueAddressEl.innerHTML = ("Address: " + venueAddress);
    venueAddressEl.style.fontSize = "18px";
    venueInfoEl.appendChild(venueAddressEl);

    // venue city //
    var venueCityEl = document.createElement("li");
    venueCityEl.className = "venue-city";
    //venueCityEl.setAttribute("id","venue-city" + parentId);
    venueCityEl.innerHTML = ("City: " + venueCity);
    venueCityEl.style.fontSize = "18px";
    venueInfoEl.appendChild(venueCityEl); 

    // venue postal code //
    var venuePostalCodeEl = document.createElement("li");
    venuePostalCodeEl.className = "event-postalcode";
    //venuePostalCodeEl.setAttribute ("id","event-postalcode" + parentId);
    venuePostalCodeEl.innerHTML = ("Zipcode: " + venuePostalCode);
    venuePostalCodeEl.style.fontSize = "18px";
    venueInfoEl.appendChild(venuePostalCodeEl);
    
    // event date //
    var eventDateEl = document.createElement("li");
    eventDateEl.className = "event-date";
   // eventDateEl.setAttribute = ("id","event-date" + parentId);
    eventDateEl.innerHTML = ("Date: " + eventDate);
    eventDateEl.style.fontSize = "18px";
    venueInfoEl.appendChild(eventDateEl);  
    
    // event time //
    var eventTimeEl = document.createElement("li");
    eventTimeEl.className = "event-time";
    //eventTimeEl.setAttribute ("id","event-time" + parentId);
    eventTimeEl.innerHTML = ("Time: " + eventTime);
    eventTimeEl.style.fontSize = "18px";
    venueInfoEl.appendChild(eventTimeEl);

    //Display Venue map only for Event Search Page. 
    if (datatype != "local"){
     var venueMapEl = document.createElement("li");
     venueMapEl.className = ("venue-info");
     venueMapEl.setAttribute("id", "venue-map" + parentId);
     venueMapEl.style.listStyle = "none";
     venueCardEl.appendChild(venueMapEl);
     mapVenueId.push(venueMapEl.getAttribute("id"));
    }
};

//imageCardContainer => Function to Create Image Card.
var imageCardContainer = function(parentEl, eventId, parentId, data, datatype){
    if (datatype != "local"){
        var eventImage = data.images[3].url;
    } else {
        var eventImage = data.eventURl;
    }
    

    var secondCardContainerEl = document.createElement("div");
    if (datatype != "local"){
        secondCardContainerEl.className = "center col s12 m4 l4";
    } else {
        secondCardContainerEl.className = "center col s12 m6 l6";
    }
    secondCardContainerEl.setAttribute ("id","second-card-container" + parentId);
    parentEl.appendChild(secondCardContainerEl);
    
    // second card - contains event image //
    var secondCardEl = document.createElement("div");
    secondCardEl.className = "card small";
    secondCardEl.setAttribute ("id","second-card" + parentId);
    secondCardEl.style.borderRadius = "25px";
    //secondCardEl.style.height = "100%";
    secondCardEl.style.borderRadius = "25px";
    secondCardContainerEl.appendChild(secondCardEl);
    
    // image container //
    var eventPhotoContainerEl = document.createElement("div");
    eventPhotoContainerEl.className = "event-photo-container";
    eventPhotoContainerEl.setAttribute("id","event-photo-container" + parentId);
    eventPhotoContainerEl.style.height = "100%";
    eventPhotoContainerEl.style.display = "flex";
    eventPhotoContainerEl.style.justifyContent = "center";
    eventPhotoContainerEl.style.alignItems = "center";
    eventPhotoContainerEl.style.borderRadius = "25px";
    secondCardEl.appendChild(eventPhotoContainerEl);
    
    // url picture of event //  
    var eventPhotoEl = document.createElement("img");
    eventPhotoEl.className = "event-photo";
    eventPhotoEl.setAttribute ("id","event-photo" + parentId);
    eventPhotoEl.setAttribute("src", eventImage);
    eventPhotoEl.style.width = "100%";
    eventPhotoEl.style.height = "100%";
    eventPhotoEl.style.position = "relative";
    eventPhotoEl.style.borderRadius = "25px";
    eventPhotoContainerEl.appendChild(eventPhotoEl);
};

//mapCardContainer => Function to create Map Card. 
var mapCardContainer = function (parentEl, eventId, parentId, data, datatype){
  
  // third card container wrapper //
  var thirdCardContainerWrapperEl = document.createElement("div");
  //thirdCardContainerWrapperEl.className = "center col s4 m4";
  thirdCardContainerWrapperEl.className = "center col s12 m4 l4";
  thirdCardContainerWrapperEl.setAttribute ("id","third-card-container-container" + parentId);
  parentEl.appendChild(thirdCardContainerWrapperEl);
  
  // third card container //
  var thirdCardContainerEl = document.createElement("div");
  thirdCardContainerEl.className = "card small";
  thirdCardContainerEl.setAttribute ("id","third-card-container"+ parentId);
  thirdCardContainerEl.style.borderRadius = "25px";
  thirdCardContainerWrapperEl.appendChild(thirdCardContainerEl);

  // third card //
  var thirdCardEl = document.createElement("div");
  thirdCardEl.className = "card-image";
  thirdCardEl.setAttribute ("id","third-card" + parentId);
  thirdCardEl.style.height = "100%";
  thirdCardEl.style.maxHeight = "100%";
  thirdCardEl.style.width = "100%";
  thirdCardEl.style.position = "relative";
  thirdCardEl.style.borderRadius = "25px";
  thirdCardContainerEl.appendChild(thirdCardEl);

  var eventMapEl = document.createElement("div");
  eventMapEl.className = "event-map";
  eventMapEl.setAttribute ("id","event-map" + parentId);
  eventMapEl.style.overflow = "visible";
  eventMapEl.style.height = "100%";
  eventMapEl.style.maxHeight = "100%";
  eventMapEl.style.width = "100%";
  eventMapEl.style.borderRadius = "25px";
  thirdCardEl.appendChild(eventMapEl);
  var test = eventMapEl.getAttribute("id");
  mapIdArray.push(test);
};

// trigger for sidenav when screen is smaller
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var options = "edge";
    var instances = M.Sidenav.init(elems, options);
});

// modal function to display Errors. 
var modalFunction = function(text){
    var elP = document.querySelector("#modal-p")
    elP.textContent = text;
    $("#demo-modal").modal();  
    $("#demo-modal").modal('open');
  
  };

//Common Function to decide Odd/Event Number. 
var findOddEven = function(num){
    if (num%2 == 0){
        return "odd";
    } else {
        return "even";
    }
};
