var AppStates, geofence;

geofence = require('geofence');

AppStates = {
  setup: function() {
    var bgGeofence;
    Ti.API.info('Registering background service');
    bgGeofence = Ti.App.iOS.registerBackgroundService({
      url: 'bgGeofence.js'
    });
    Ti.App.addEventListener('pause', function() {
      return Ti.API.info('app is pause');
    });
    Ti.App.addEventListener('paused', function() {
      return Ti.API.info('app is paused');
    });
    Ti.App.addEventListener('resume', function() {
      return Ti.API.info('app is resume');
    });
    return Ti.App.addEventListener('resumed', function() {
      return Ti.API.info('app is resumed');
    });
  }
};

module.exports = AppStates;

//# sourceMappingURL=appStates.js.map
