var ParsePush, PushRegistration;

ParsePush = require('parsePush');

PushRegistration = {
  subscribe: function() {
    if (OS_IOS) {
      return Ti.Network.registerForPushNotifications({
        types: [Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_SOUND],
        callback: function(e) {
          return alert(JSON.stringify(e));
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
      appName: appConfig.name,
      timeZone: "America/Los_Angeles"
    }, this.registeredWithParse, this.errorFromParse);
  },
  registeredWithParse: function(e, status) {
    Ti.API.info('It worked');
    return Ti.API.info(JSON.stringify(e));
  },
  errorFromParse: function(e) {
    alert('It did not work');
    return alert(JSON.stringify(e));
  }
};

module.exports = PushRegistration;

//# sourceMappingURL=registerForPush.js.map
