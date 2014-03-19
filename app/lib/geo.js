var API_KEY = '&key=AIzaSyCO20Y4H2HQEgvoNu7LkNEWzrxKo--t8P8'
var GOOGLE_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var ERROR_MESSAGE = 'There was an error geocoding. Please try again.';

var GeoData = function(title, latitude, longitude, results, closestResult) {
  this.title = title;
  this.coords = {
    latitude: latitude,
    longitude: longitude
  };
  this.results = results;
  this.closestResult = closestResult;
};

exports.forwardGeocode = function(address, callback) {
  if (Ti.Platform.osname === 'mobileweb') {
    forwardGeocodeWeb(address, callback);
  } else {
    forwardGeocodeNative(address, callback);
  }
};

var forwardGeocodeNative = function(address, callback) {
  var xhr = Titanium.Network.createHTTPClient();
  var url = GOOGLE_BASE_URL + address.replace(/\s/g, '+') + API_KEY;
  url += "&sensor=" + (Titanium.Geolocation.locationServicesEnabled == true);
  Ti.API.info(url);

  xhr.open('GET', url);
  xhr.onload = function() {
    Ti.API.info('Loaded stuff');
    var json = JSON.parse(this.responseText);
    if (json.status != 'OK') {
      alert('Unable to geocode the address');
      return;
    }

    closestResult = findClosestResult(json.results);
    // closestResult = json.results[0];
    callback(new GeoData(
          address,
          closestResult.geometry.location.lat,
          closestResult.geometry.location.lng,
          json.results,
          closestResult
          ));
  };
  xhr.onerror = function(e) {
    Ti.API.error(e.error);
    alert(ERROR_MESSAGE);
  };
  xhr.send();
};

var findClosestResult = function(results) {
  sortedResults = _.sortBy(results, function(result) {
    resultLocation = {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng
    };
    var distance = calcDistance(Alloy.Globals.location, resultLocation);
    return distance;
  });
  return sortedResults[0];
};

var calcDistance = function(currentLocation, resultLocation) {
  var distance = Math.sqrt(
      Math.pow(resultLocation.latitude - currentLocation.latitude, 2) + 
        Math.pow(resultLocation.longitude - currentLocation.longitude, 2)
  );
  return distance;
};

var forwardGeocodeWeb = function(address, callback) {
  var geocoder = new google.maps.Geocoder();
  if (geocoder) {
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        callback(new GeoData(
            address,
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
            ));
      } else {
        Ti.API.error(status);
        alert(ERROR_MESSAGE);
      }
    });
  } else {
    alert('Google Maps Geocoder not supported');
  }
};
