var args, findAddress, finishUp, report, searchAgain, setLocation;

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
  return alert('almost done!');
};

findAddress = function() {
  var geo, workAddress;
  geo = require('geo');
  workAddress = $.workAddress.value;
  return geo.forwardGeocode(workAddress, function(geodata) {
    var coords, workLocation;
    coords = geodata.coords;
    Ti.API.info(coords);
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
      subtitle: geodata.closestResult.formatted_address,
      pincolor: Alloy.Globals.Map.ANNOTATION_RED,
      id: 'workPin'
    });
    $.mapview.addAnnotation(workLocation);
    Ti.API.info(JSON.stringify(workLocation));
    workLocation.fireEvent('click');
    return $.confirm.show();
  });
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
  return $.workAddress.focus();
});

//# sourceMappingURL=setupWorkAddress.js.map
