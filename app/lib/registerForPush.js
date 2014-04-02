var ParsePush, PushRegistration;

ParsePush = require('parsePush');

PushRegistration = {
  subscribe: function() {
    if (OS_IOS) {
      if (Ti.Network.remoteNotificationsEnabled) {
        return Ti.API.info('notifications are already enabled');
      } else {
        return Ti.Network.registerForPushNotifications({
          types: [Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_SOUND],
          callback: function(e) {
            alert(JSON.stringify(e));
            return Ti.Media.vibrate();
          },
          success: (function(_this) {
            return function(e) {
              var deviceToken;
              deviceToken = e.deviceToken;
              return _this.registerWithParse(e);
            };
          })(this),
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
    var appConfig;
    appConfig = require('appConfig');
    return ParsePush.register({
      deviceType: 'ios',
      deviceToken: e.deviceToken,
      channels: [Parse.User.current().id],
      appName: appConfig.name
    }, this.registeredWithParse, this.errorFromParse);
  },
  registeredWithParse: function(e, status) {
    Ti.API.info('It worked');
    return Ti.API.info(JSON.stringify(e));
  },
  errorFromParse: function(e) {
    var Error, error;
    Error = Parse.Object.extend("Error");
    error = new Error();
    error.set(e);
    error.set('when', 'registering push notifications: registerForPush');
    error.save();
    alert("We had trouble registering your device for push notifications. We're looking into it.");
    return Ti.API.info(JSON.stringify(e));
  }
};

module.exports = PushRegistration;

//# sourceMappingURL=registerForPush.js.map
