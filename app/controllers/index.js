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
  setup = Alloy.createController('setupWorkAddress').getView();
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

setupGeofence = function() {
  var ci_geofencing, regions, workLocation;
  if (OS_IOS) {
    ci_geofencing = require('ci.geofencing');
    Ti.API.info("module is =&gt; " + ci_geofencing);
    workLocation = Ti.App.Properties.getObject('workLocation');
    regions = [];
    regions.push({
      "title": "Work",
      "latitude": workLocation.latitude,
      "longitude": workLocation.longitude,
      "radius": 50
    });
    return ci_geofencing.startGeoFencing(regions, function(event) {
      Ti.API.info('info ' + JSON.stringify(event, null, 2));
      if (event.type === "entered_region") {
        alert("ENTERED REGION!");
      }
      if (event.type === "monitoring_region") {
        alert("MONITORING REGION!");
      }
      if (event.type === "exited_region") {
        return Parse.Cloud.run('testpush', {}, {
          success: function(res) {
            return alert('it worked');
          },
          error: function(err) {
            return alert('it did not work');
          }
        });
      }
    });
  }
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
      return setupGeofence();
    } else {
      return launchSetup();
    }
  } else {
    return openLogin();
  }
};

init();

//# sourceMappingURL=index.js.map
