var AlwaysOn, geofenceHandlers;

geofenceHandlers = require('geofenceHandlers');

AlwaysOn = {
  setupGeofence: function(fenceModule) {
    var geofence, workLocation;
    Ti.API.debug("AlwaysOn: setupGeofence");
    workLocation = Ti.App.Properties.getObject('workLocation');
    if (OS_IOS) {
      if (workLocation != null) {
        geofence = Alloy.Globals.geofence || require('geofence');
        return Alloy.Globals.activeFence = geofence.setup([
          {
            "title": "Work",
            "latitude": workLocation.latitude,
            "longitude": workLocation.longitude,
            "radius": 50
          }, {
            "title": "Work-20",
            "latitude": workLocation.latitude,
            "longitude": workLocation.longitude,
            "radius": 20
          }, {
            "title": "Work-125",
            "latitude": workLocation.latitude,
            "longitude": workLocation.longitude,
            "radius": 125
          }, {
            "title": "Work-250",
            "latitude": workLocation.latitude,
            "longitude": workLocation.longitude,
            "radius": 250
          }, {
            "title": "Work-500",
            "latitude": workLocation.latitude,
            "longitude": workLocation.longitude,
            "radius": 500
          }, {
            "title": "Work-1000",
            "latitude": workLocation.latitude,
            "longitude": workLocation.longitude,
            "radius": 1000
          }, {
            "title": "Work-2000",
            "latitude": workLocation.latitude,
            "longitude": workLocation.longitude,
            "radius": 2000
          }, {
            "title": "Work-5000",
            "latitude": workLocation.latitude,
            "longitude": workLocation.longitude,
            "radius": 5000
          }
        ], geofenceHandlers, fenceModule);
      }
    }
  }
};

module.exports = AlwaysOn;

//# sourceMappingURL=alwaysOn.js.map
