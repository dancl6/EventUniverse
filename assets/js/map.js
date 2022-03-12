
// display route from starting city to venue location
var directionsRenderer;
  var directionsService ;
  var initMap = function(elId) {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom:7,
      center: chicago
    };
    var map = new google.maps.Map(document.getElementById(elId), mapOptions);
    directionsRenderer.setMap(map);
    setTimeout(function() {
      google.maps.event.trigger(map, 'resize');
    }, 5000);

     function init() {
      // Google Map Options
      var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 10,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(41.82399, -71.41283), // New York

        styles: [{
          "featureType": "administrative.country",
          "elementType": "geometry",
          "stylers": [{
            "visibility": "simplified"
          }, {
            "hue": "#ff0000"
          }]
        }]
      };
    };
    google.maps.event.addDomListener(window, 'load', init);
  };
  var calcRoute = function calcRoute(latStart,lngStart,latEnd,lngEnd,elId) {
      console.log("after calc route:" +latStart+" "+lngStart+" "+latEnd+" "+lngEnd+" "+elId);
    var start = {lat: latStart, lng: lngStart};
    var end = {lat: latEnd, lng: lngEnd};
           
    initMap(elId)
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };
    var directionsService = new google.maps.DirectionsService();
    
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      } 

    });
    
  };


// get distance and time between starting city and venue location
var mapsDistanceAndTime = function(latStart1,lngStart1,latEnd1,lngEnd1, idResults) {
  var bounds = new google.maps.LatLngBounds;
  var markersArray = [];

  var origin1 = {lat: parseFloat(latStart1), lng: parseFloat(lngStart1)};
  var origin2 = {lat: 37.71, lng: -122.45};
  var destinationA = {lat: 40.0097571, lng: -76.6297189};
  var destinationB ={lat: parseFloat(latEnd1), lng: parseFloat(lngEnd1)};

  var destinationIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=D|FF0000|000000';
  var originIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=O|FFFF00|000000';

  var geocoder = new google.maps.Geocoder;

  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [origin1],
    destinations: [destinationB],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== 'OK') {
      // alert('Error was: ' + status);
      modalFunction('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      var outputDiv = document.getElementById(idResults);
      console.log("output is :" + outputDiv);
      outputDiv.innerHTML = '';
      deleteMarkers(markersArray);

      var showGeocodedAddressOnMap = function(asDestination) {
        var icon = asDestination ? destinationIcon : originIcon;
        return function(results, status) {

        };
      };

      for (var i = 0; i < originList.length; i++) {
        var results = response.rows[i].elements;
        geocoder.geocode({'address': originList[i]},
            showGeocodedAddressOnMap(false));
            
        for (var j = 0; j < results.length; j++) {
          geocoder.geocode({'address': destinationList[j]},
              showGeocodedAddressOnMap(true));
              console.log("results is ");
              console.log(results);
          outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
              ': ' + results[j].distance.text + ' in ' +
              results[j].duration.text + '<br>';
              console.log("results is : " + results[j].distance.text)
        }
      }
    }

  });

  function deleteMarkers(markersArray) {
      for (var i = 0; i < markersArray.length; i++) {
        // markersArray[i].setMap(null);
      }
      markersArray = [];
    }
  }
