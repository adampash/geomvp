var PushRegistration;

PushRegistration = {
  subscribe: function() {
    if (OS_IOS) {
      if (Ti.Network.remoteNotificationsEnabled) {
        return Ti.API.info('remove notifications are already enabled');
      } else {
        return Ti.Network.registerForPushNotifications({
          types: [Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_SOUND],
          callback: function(e) {
            alert('got a push notification!');
            return alert(JSON.stringify(e));
          },
          success: function(e) {
            var deviceToken;
            alert('registration was successful');
            deviceToken = e.deviceToken;
            return this.registerWithParse(e);
          },
          error: function(e) {
            Ti.API.debug('that was an error');
            Ti.API.debug(e);
            return alert(JSON.stringify(e));
          }
        });
      }
    } else if (OS_ANDROID) {
      return alert('need to register for push on android');
    }
  },
  registerWithParse: function(e) {
    return ParsePush.register({
      deviceType: 'ios',
      deviceToken: e.deviceToken,
      channels: [Parse.User.current().id]
    }, this.registeredWithParse, this.errorFromParse);
  },
  registeredWithParse: function(e, status) {
    alert('It worked');
    alert(JSON.stringify(e));
    return alert(status);
  },
  errorFromParse: function(e) {
    return alert('It did not work');
  }
};

module.exports = PushRegistration;

//# sourceMappingURL=registerForPush.js.map
