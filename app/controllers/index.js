var Cloud, Parse, createUser, errorFromParse, registerWithCloud, registerWithParse, registeredWithParse, sendTestNotification, subscribe;

Cloud = require('ti.cloud');

Parse = require('parse');

createUser = function() {
  return Cloud.Users.secureCreate({
    title: 'Sign Up Here'
  }, function(e) {
    if (e.success) {
      alert('Success:\\n' + e);
      return alert(Cloud.accessToken);
    } else {
      return alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
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

registerWithCloud = function(e) {
  return Cloud.PushNotifications.subscribe({
    channel: 'test',
    device_token: e.deviceToken,
    type: 'ios'
  }, function(e) {
    if (e.success) {
      return alert('Subscribed :' + ((e.error && e.message) || JSON.stringify(e)));
    } else {
      return alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
    }
  });
};

registerWithParse = function(e) {
  alert('register with parse');
  return Parse.register({
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

sendTestNotification = function() {
  return Cloud.PushNotifications.notifyTokens({
    to_tokens: deviceToken,
    channel: 'test',
    payload: 'This is a test.'
  }, function(e) {
    if (e.success) {
      return alert('Push notification sent');
    } else {
      return alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
    }
  });
};

$.index.open();

//# sourceMappingURL=index.js.map
