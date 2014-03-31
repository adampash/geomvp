var Parse, ParsePush, init, launchSetup, openLogin, setPin, startOver, testSinglePush;

ParsePush = require('parsePush');

Parse = require('tiparse')({
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K',
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
});

testSinglePush = function() {
  return Parse.Cloud.run('testpush', {}, {
    success: function(res) {
      return alert('it worked');
    },
    error: function(err) {
      return alert('it did not work');
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
  return setup.open();
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

init = function() {
  var alwaysOn, appStates, contact, contactRecordId, currentUser, name, workLocation;
  currentUser = Parse.User.current();
  if (currentUser) {
    Ti.API.info("User is currently logged in: " + currentUser.id);
    if (Ti.App.Properties.getBool('setupComplete')) {
      Ti.API.info("Setup is complete");
      workLocation = Ti.App.Properties.getObject('workLocation');
      if (workLocation != null) {
        Ti.API.info('also draw radius now?');
        setPin(workLocation.address, workLocation);
      }
      contactRecordId = Ti.App.Properties.getString('contactRecordId');
      contact = Ti.Contacts.getPersonByID(parseInt(contactRecordId, 10));
      if (contact != null) {
        Ti.API.info(JSON.stringify(contact));
        name = contact.firstName;
        if (name == null) {
          name = contact.fullName.split(' ')[0];
        }
        $.contact.text = "we'll send " + name + " a push notification";
      }
      $.index.open();
      if (Alloy.Globals.activeFence != null) {
        Alloy.Globals.activeFence.stopGeoFencing();
        Alloy.Globals.activeFence = null;
      }
      alwaysOn = require('alwaysOn');
      alwaysOn.setupGeofence();
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
