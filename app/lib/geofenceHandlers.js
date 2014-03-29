var Analytics, GeofenceHandlers, Parse, debugNotification;

Parse = require('tiparse')({
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K',
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
});

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
    debugNotification('onexit', e);
    e.device = Ti.Platform.model;
    if (e.identifier === "Work") {
      return Parse.Cloud.run('leftWorkPush', e, {
        success: function(res) {
          return Ti.API.info('Parse code successfully ran');
        },
        error: function(err) {
          Ti.API.info('it did not work');
          return Ti.API.info(err);
        }
      });
    }
  },
  onenter: function(e) {
    Ti.API.info('Elvis has entered the building');
    debugNotification('onenter', e);
    return Analytics.track('entered', {
      fenceId: e.identifier,
      device: Ti.Platform.model
    });
  }
};

module.exports = GeofenceHandlers;

//# sourceMappingURL=geofenceHandlers.js.map
