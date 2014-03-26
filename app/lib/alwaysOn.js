var AlwaysOn, geofenceHandlers;

geofenceHandlers = require('geofenceHandlers');

AlwaysOn = {
  setupGeofence: function() {
    var geofence, workLocation;
    workLocation = Ti.App.Properties.getObject('workLocation');
    if (OS_IOS) {
      if (workLocation != null) {
        geofence = require('geofence');
        return geofence.setup([
          {
            "title": "Work",
            "latitude": workLocation.latitude,
            "longitude": workLocation.longitude,
            "radius": 50
          }
        ], geofenceHandlers);
      }
    }
  }
};

module.exports = AlwaysOn;

//# sourceMappingURL=alwaysOn.js.map
