var WorkAddress, args, findAddress, finishUp, focusAddress, launchNextStep, searchAgain, setLocation, setPin;

args = arguments[0] || {};

WorkAddress = require('workAddress');

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
  $.searchForAddress.show();
  $.mapContainer.hide();
  return $.workAddress.focus();
};

finishUp = function() {
  var workLocation;
  workLocation = {
    latitude: $.mapview.annotations[0].latitude,
    longitude: $.mapview.annotations[0].longitude,
    address: $.mapview.annotations[0].subtitle
  };
  Ti.App.Properties.setObject('workLocation', workLocation);
  WorkAddress.findOrCreate(workLocation);
  return launchNextStep();
};

launchNextStep = function() {
  var scrollableView;
  scrollableView = $.setupWorkAddress.getParent();
  return scrollableView.scrollToView(scrollableView.currentPage + 1);
};

findAddress = function() {
  var geo, workAddress;
  geo = require('geo');
  workAddress = $.workAddress.value;
  return geo.forwardGeocode(workAddress, function(geodata) {
    var coords;
    coords = geodata.coords;
    Ti.API.info(coords);
    setPin(geodata.closestResult.formatted_address, coords);
    $.searchForAddress.hide();
    $.mapContainer.show();
    Ti.API.info($.mapContainer);
    return Ti.API.info($.mapContainer.getVisible());
  });
};

setPin = function(formattedAddress, coords) {
  var workLocation;
  if ($.mapview.annotations.length > 0) {
    $.mapview.removeAnnotation($.mapview.annotations[0].title);
  }
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
  return $.mapview.annotations[0].fireEvent('click');
};

Ti.Geolocation.purpose = "Share you location";

if (Ti.Geolocation.locationServicesEnabled) {
  Ti.Geolocation.addEventListener("location", setLocation);
  Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS;
  Ti.Geolocation.distanceFilter = 15;
} else {
  alert("Please enable location services");
}

focusAddress = function() {
  return $.workAddress.focus();
};

$.setupWorkAddress.addEventListener('open', function() {
  var workLocation;
  workLocation = Ti.App.Properties.getObject('workLocation');
  if (workLocation != null) {
    return setPin(workLocation.address, workLocation);
  }
});

//# sourceMappingURL=setupWorkAddress.js.map
