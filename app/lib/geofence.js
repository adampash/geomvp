var Geofence, ci_geofencing;

ci_geofencing = require('ci.geofencing');

Geofence = {
  setup: function(regionArray, callbacks) {
    callbacks = callbacks || {};
    if (OS_IOS) {
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
          Ti.API.info('exit event');
          if (callbacks.onexit != null) {
            return callbacks.onexit();
          }
        }
      });
    } else if (OS_ANDROID) {
      return alert('Need to figure this one out dude');
    }
  },
  stop: function() {
    Ti.API.info('stopping geofence');
    return ci_geofencing.stopGeoFencing();
  }
};

module.exports = Geofence;

//# sourceMappingURL=geofence.js.map
