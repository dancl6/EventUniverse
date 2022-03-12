//This file contains  schema definition for eventType, Event and Venue. 

var eventType = function(){
    return {
        id : "",
        type : "", //store different type of Events
        eventId : []
    };
};

var event = function() {
    return {
        id : "",  //unique Id of an Event
        name : "", //name of an event
        eventId : "", //unique Id from TiketMaster API
        eventURl : "", //Event Image URL of Size 3_2
        locale : "", //
        startDate : "",
        localTime : "",
        popularityIndex : 0,
        venueId : []
    };
};

var venue = function (){
    return {
        id : "", 
        name : "",
        venueId : "",
        postalCode: "",
        timeZone: "",
        city: "",
        stateName: "",
        stateCode : "",
        countryName: "",
        countryCode: "",
        address : "",
        longitude: "",
        latitude: "",
    };
};

var inputValue = function(){
    return {
        city : "",
        state : "",
        radius : "",
        startDate : "",
        endDate : ""
    };
};
