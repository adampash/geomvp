var Parse, ParsePush, init, launchSetup, openLogin, setPin, setupGeofence, startOver, testSinglePush;

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
  Ti.App.Properties.setBool('setupComplete', false);
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

setupGeofence = function(workLocation) {
  var geofence;
  geofence = require('geofence');
  return geofence.setup([
    {
      "title": "Work",
      "latitude": workLocation.latitude,
      "longitude": workLocation.longitude,
      "radius": 50
    }
  ], {
    onexit: function() {
      alert('Elvis has left the building');
      return Parse.Cloud.run('testpush', {}, {
        success: function(res) {
          alert('push notification successfully sent');
          return alert(res);
        },
        error: function(err) {
          return alert('it did not work');
        }
      });
    },
    onenter: function() {
      return alert('Elvis has entered the building');
    }
  });
};

init = function() {
  var contact, contactRecordId, currentUser, name, workLocation;
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
      return setupGeofence(workLocation);
    } else {
      return launchSetup();
    }
  } else {
    return launchSetup();
  }
};

init();

//# sourceMappingURL=index.js.map
