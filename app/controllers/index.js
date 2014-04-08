var Parse, ParsePush, editSettings, geofence, init, launchSetup, openLogin, sendFeedback, setPin, startOver, testSinglePush;

Ti.API.info("starting index.js");

ParsePush = require('parsePush');

Parse = require('tiparse')({
  applicationId: Alloy.Globals.parseKeys.appId,
  javascriptkey: Alloy.Globals.parseKeys.appKey
});

geofence = require('geofenceWrapper');

sendFeedback = function() {
  var feedback;
  feedback = Alloy.createController('feedback').getView();
  return feedback.open();
};

testSinglePush = function() {
  return Parse.Cloud.run('testapush', {}, {
    success: function(res) {
      return alert('it worked');
    },
    error: function(err) {
      alert('it did not work');
      return Ti.API.info(JSON.stringify(err));
    }
  });
};

editSettings = function() {
  var edit;
  edit = Alloy.createController('editSettings').getView();
  return edit.open();
};

startOver = function() {
  Parse.User.logOut();
  Ti.App.Properties.setBool('setupComplete', null);
  Ti.App.Properties.setObject('workLocation', null);
  Ti.App.Properties.setString('departureTime', null);
  Ti.App.Properties.setString('contactRecordId', null);
  return init();
};

openLogin = function() {
  var login;
  Ti.API.info("Open login");
  login = Alloy.createController('login').getView();
  return login.open();
};

launchSetup = function() {
  var setup;
  Ti.API.info("Launch setup");
  setup = Alloy.createController('setup').getView();
  setup.open();
  return $.index.close();
};

setPin = function(formattedAddress, coords) {
  var workLocation;
  $.mapview.region = {
    latitude: coords.latitude,
    longitude: coords.longitude,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004
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

$.index.addEventListener('close', function(e) {
  Ti.API.info('stop geofencing');
  return geofence.stopGeoFencing();
});

init = function() {
  var alwaysOn, appStates, currentUser;
  currentUser = Parse.User.current();
  if (currentUser) {
    Ti.API.info("User is currently logged in: " + currentUser.id);
    if (Ti.App.Properties.getBool('setupComplete')) {
      Ti.API.info("Setup is complete");
      $.index.open();
      alwaysOn = require('alwaysOn');
      alwaysOn.setupGeofence(geofence);
      if (OS_IOS) {
        appStates = require('appStates');
        return appStates.setup();
      }
    } else {
      return launchSetup();
    }
  } else {
    return launchSetup();
  }
};

init();

//# sourceMappingURL=index.js.map
