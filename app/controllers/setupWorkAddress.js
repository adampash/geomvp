var args, findAddress, finishUp, launchLastStep, report, searchAgain, setLocation, setPin;

args = arguments[0] || {};

Ti.API.info('setting up some business');

report = function() {
  return alert('clicked');
};

setLocation = function(location) {
  var coords;
  Ti.API.info("Set location");
  coords = location.coords;
  return Alloy.Globals.location = {
    latitude: coords.latitude,
    longitude: coords.longitude
  };
};

searchAgain = function() {
  $.confirm.hide();
  return $.workAddress.focus();
};

finishUp = function() {
  var workLocation;
  workLocation = {
    latitude: $.mapview.annotations[0].latitude,
    longitude: $.mapview.annotations[0].longitude,
    address: $.mapview.annotations[0].subtitle
  };
  return Ti.App.Properties.setObject('workLocation', workLocation);
};

launchLastStep = function() {
  var chooseContact;
  Ti.API.info("Launch last step");
  chooseContact = Alloy.createController('chooseContact').getView();
  return chooseContact.open();
};

findAddress = function() {
  var geo, workAddress;
  geo = require('geo');
  workAddress = $.workAddress.value;
  return geo.forwardGeocode(workAddress, function(geodata) {
    var coords;
    coords = geodata.coords;
    Ti.API.info(coords);
    return setPin(geodata.closestResult.formatted_address, coords);
  });
};

setPin = function(formattedAddress, coords) {
  var workLocation;
  $.mapview.region = {
    latitude: coords.latitude,
    longitude: coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  };
  workLocation = Alloy.Globals.Map.createAnnotation({
    latitude: coords.latitude,
    longitude: coords.longitude,
    title: "Your work",
    subtitle: formattedAddress,
    pincolor: Alloy.Globals.Map.ANNOTATION_RED,
    id: 'workPin'
  });
  $.mapview.addAnnotation(workLocation);
  $.mapview.annotations[0].fireEvent('click');
  return $.confirm.show();
};

Ti.Geolocation.purpose = "Share you location";

if (Ti.Geolocation.locationServicesEnabled) {
  Ti.Geolocation.addEventListener("location", setLocation);
  Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS;
  Ti.Geolocation.distanceFilter = 15;
} else {
  alert("Please enable location services");
}

$.setupWorkAddress.addEventListener('open', function() {
  var workLocation;
  workLocation = Ti.App.Properties.getObject('workLocation');
  if (workLocation != null) {
    return setPin(workLocation.address, workLocation);
  } else {
    return $.workAddress.focus();
  }
});

//# sourceMappingURL=setupWorkAddress.js.map
