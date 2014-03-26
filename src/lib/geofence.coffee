Geofence =
  setup: (regionArray, callbacks) ->
    callbacks = callbacks || {}
    if OS_IOS
      ci_geofencing = require('ci.geofencing')
      Ti.API.info("module is =&gt; " + ci_geofencing)

      ci_geofencing.startGeoFencing(regionArray, (event) ->
        Ti.API.info('info ' + JSON.stringify(event, null, 2))

        if event.type is "entered_region"
          # ci_geofencing.stopGeoFencing()
          # alert("ENTERED REGION!")
          callbacks.onenter() if callbacks.onenter?

        if event.type is "monitoring_region"
          # ci_geofencing.stopGeoFencing()
          # alert("MONITORING REGION!")
          Ti.API.info 'monitoring a region'

        if event.type is "exited_region"
          # ci_geofencing.stopGeoFencing();
          # alert("LEFT REGION!")
          callbacks.onexit() if callbacks.onexit?
      )
    else if OS_ANDROID
      alert 'Need to figure this one out dude'

module.exports = Geofence
