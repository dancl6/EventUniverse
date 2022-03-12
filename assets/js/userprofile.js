// This file contains code for User Profile schema definition.

var userProfile = function(){
    return {
        id : "", //unique Id
        firstName : "", //user First Name
        middlename : "", //User Middle Name
        lastName : "", //user Last Name
        email : "",
        passwd : "", //Store User Password
        primaryCell: "", //user cell number
        address: "", //User Address
        pincode: "", //pinCode
        city: "", //UserCity name
        country: "", //user Country
        geoCityHash: "", //GeoCityHash
        longitude : "", 
        latitude : "",
        eventId : [],
    }
};

