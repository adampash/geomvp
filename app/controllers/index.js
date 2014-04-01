var Parse, ParsePush, geofence, init, launchSetup, openLogin, sendFeedback, setPin, startOver, testSinglePush;

ParsePush = require('parsePush');

Parse = require('tiparse')({
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K',
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
});

geofence = require('geofenceWrapper');

sendFeedback = function() {
  var Feedback, feedback, feedbackText;
  feedbackText = $.feedback.value;
  if (feedbackText === "") {
    return $.feedback.focus();
  } else {
    Feedback = Parse.Object.extend("Feedback");
    feedback = new Feedback();
    feedback.set("text", feedbackText);
    feedback.set("parent", Parse.User.current());
    return feedback.save().then(function(response) {
      alert("Feedback received! Thanks so much for taking the time.");
      $.feedback.value = '';
      return $.feedback.blur();
    }, function(response) {
      return alert("Sorry, had trouble saving your feedback");
    });
  }
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
