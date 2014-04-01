var Geofence;

Geofence = {
  setup: function(regionArray, callbacks, geofence) {
    callbacks = callbacks || {};
    if (OS_IOS) {
      geofence.stopGeoFencing();
      Ti.API.info("module is =&gt; " + geofence);
      geofence.startGeoFencing(regionArray, function(event) {
        if (event.type === "entered_region") {
          if (callbacks.onenter != null) {
            callbacks.onenter(event);
          }
        }
        if (event.type === "monitoring_region") {
          Ti.API.info('monitoring a region ' + event.identifier);
        }
        if (event.type === "exited_region") {
          Ti.API.info('exit event');
          if (callbacks.onexit != null) {
            return callbacks.onexit(event);
          }
        }
      });
      return geofence;
    } else if (OS_ANDROID) {
      return alert('Need to figure this one out dude');
    }
  },
  stop: function() {
    Ti.API.info('stopping geofence');
    return geofence.stopGeoFencing();
  }
};

module.exports = Geofence;

//# sourceMappingURL=geofence.js.map
