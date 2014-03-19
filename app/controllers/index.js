var Cloud, Parse, ParsePush, createUser, currentUser, errorFromParse, registerWithParse, registeredWithParse, subscribe;

Cloud = require('ti.cloud');

ParsePush = require('parsePush');

Parse = require('tiparse')({
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K',
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
});

currentUser = Parse.User.current();

if (currentUser) {
  Ti.API.info("Current user id: " + currentUser.id);
} else {
  Ti.API.info('No current user?');
}

createUser = function() {
  var user;
  user = new Parse.User();
  user.set('username', 'adampash');
  user.set('password', 'pass');
  user.set('email', 'adam.pash@gmail.com');
  return user.signUp(null, {
    success: function(user) {
      return alert('WHOA, that worked');
    },
    error: function(user, error) {
      return alert("Error: " + error.code + " " + error.message);
    }
  });
};

subscribe = function() {
  alert('register for push');
  return Ti.Network.registerForPushNotifications({
    types: [Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_SOUND],
    callback: function(e) {
      return alert('got a push notification!');
    },
    success: function(e) {
      var deviceToken;
      alert('registration was successful');
      deviceToken = e.deviceToken;
      return registerWithParse(e);
    },
    error: function(e) {
      Ti.API.debug('that was an error');
      Ti.API.debug(e);
      return alert(JSON.stringify(e));
    }
  });
};

registerWithParse = function(e) {
  alert('register with parse');
  return ParsePush.register({
    deviceType: 'ios',
    deviceToken: e.deviceToken,
    channels: ['']
  }, registeredWithParse, errorFromParse);
};

registeredWithParse = function(e, status) {
  alert('It worked');
  alert(JSON.stringify(e));
  return alert(status);
};

errorFromParse = function(e) {
  return alert('It did not work');
};

$.index.open();

//# sourceMappingURL=index.js.map
