var Geofence;

Geofence = {
  setup: function(regionArray, callbacks) {
    var ci_geofencing;
    callbacks = callbacks || {};
    if (OS_IOS) {
      ci_geofencing = require('ci.geofencing');
      Ti.API.info("module is =&gt; " + ci_geofencing);
      return ci_geofencing.startGeoFencing(regionArray, function(event) {
        Ti.API.info('info ' + JSON.stringify(event, null, 2));
        if (event.type === "entered_region") {
          if (callbacks.onenter != null) {
            callbacks.onenter();
          }
        }
        if (event.type === "monitoring_region") {
          Ti.API.info('monitoring a region');
        }
        if (event.type === "exited_region") {
          if (callbacks.onexit != null) {
            return callbacks.onexit();
          }
        }
      });
    } else if (OS_ANDROID) {
      return alert('Need to figure this one out dude');
    }
  }
};

module.exports = Geofence;

//# sourceMappingURL=geofence.js.map
