var Analytics, GeofenceHandlers, debugNotification;

Analytics = require('analytics');

debugNotification = function(type, e) {
  var notification;
  Ti.API.info('debugNotification');
  Ti.Media.vibrate();
  return notification = Ti.App.iOS.scheduleLocalNotification({
    alertBody: 'Triggered ' + type + 'through ' + e.identifier,
    alertAction: "Re-Launch!",
    userInfo: {
      "hello": "world"
    },
    date: new Date(new Date().getTime()),
    sound: "sounds/horn.wav"
  });
};

GeofenceHandlers = {
  onexit: function(e) {
    Ti.API.info('Elvis has left the building');
    Ti.API.info(e);
    e.device = Ti.Platform.model;
    Titanium.Geolocation.purpose = "Determine your location";
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    return Ti.Geolocation.getCurrentPosition(function(position) {
      e.coords = position.coords;
      e.latitude = position.coords.latitude;
      e.longitude = position.coords.longitude;
      e.workCoords = Ti.App.Properties.getObject('workLocation');
      return Parse.Cloud.run('leftWorkPush', e, {
        success: function(res) {
          return Ti.API.info('Parse code successfully ran');
        },
        error: function(err) {
          Ti.API.info('it did not work');
          return Ti.API.info(err);
        }
      });
    });
  },
  onenter: function(e) {
    Ti.API.info('Elvis has entered the building');
    e.device = Ti.Platform.model;
    Ti.Geolocation.purpose = "Determine your location";
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    return Ti.Geolocation.getCurrentPosition(function(position) {
      e.coords = position.coords;
      e.latitude = position.coords.latitude;
      e.longitude = position.coords.longitude;
      return Parse.Cloud.run('enteredFence', e, {
        success: function(res) {
          return Ti.API.info('Parse code successfully ran');
        },
        error: function(err) {
          Ti.API.info('it did not work');
          return Ti.API.info(err);
        }
      });
    });
  }
};

module.exports = GeofenceHandlers;

//# sourceMappingURL=geofenceHandlers.js.map
