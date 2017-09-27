global = window.global || {};

function initDistanceCalculator(){

  global.geoCodedLocations = [];

  for (i in global.locations){
    geoCode(global.locations[i]);
  }
}

function geoCode(location){

    var geocoder = new google.maps.Geocoder();
    var p1;
    geocoder.geocode({'address': location}, function(results, status) {
      if (status === 'OK') {
        global.geoCodedLocations.push(results[0]);
      } else {
        showMessage('Couldn\'t find that place. Try a nearby city :)', 4000);
      }

      //Fire
      if(global.geoCodedLocations.length == 2){

        //Some conditions

        var d =  getDistance(global.geoCodedLocations);
        global.distance = Math.round(d);
        setState(3);
      }
    });

}

var getDistance = function(geoCodedLocations){

  var p1 = geoCodedLocations[0].geometry.location;
  var p2 = geoCodedLocations[1].geometry.location;

  var rad = function(x) {
    return x * Math.PI / 180;
  };

  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d/1609.344; // returns the distance in miles
};
