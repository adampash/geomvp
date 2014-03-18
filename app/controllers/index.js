var Cloud, createUser, login, properties, registerWithCloud, securely, sendTestNotification, subscribe;

Cloud = require('ti.cloud');

securely = require('bencoding.securely');

properties = securely.createProperties({
  secret: "901083jjkn38jfsksKJk209jKJXj8",
  identifier: "deviceToken",
  accessGroup: "myAccessGroup",
  encryptFieldNames: false
});

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

login = function() {
  return Cloud.Users.secureLogin({
    title: 'Log In Here'
  }, function(e) {
    if (e.success) {
      return alert('Logged in:\n' + Cloud.accessToken);
    } else {
      return alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
    }
  });
};

subscribe = function() {
  Ti.Network.registerForPushNotifications({
    types: [Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_SOUND],
    callback: function(e) {
      return alert('got a push notification!');
    },
    success: function(e) {
      var deviceToken;
      alert('that was successful');
      deviceToken = e.deviceToken;
      properties.setString('deviceToken', e.deviceToken);
      return registerWithCloud(e);
    },
    error: function(e) {
      Ti.API.debug('that was an error');
      Ti.API.debug(e);
      return alert(e);
    }
  });
  return alert('push');
};

registerWithCloud = function(e) {
  return Cloud.PushNotifications.subscribe({
    channel: 'test',
    device_token: properties.getString('deviceToken'),
    type: 'ios'
  }, function(e) {
    if (e.success) {
      return alert('Subscribed :' + ((e.error && e.message) || JSON.stringify(e)));
    } else {
      return alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
    }
  });
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
