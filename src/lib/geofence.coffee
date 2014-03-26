ci_geofencing = require 'ci.geofencing'

Geofence =
  setup: (regionArray, callbacks) ->
    callbacks = callbacks || {}
    if OS_IOS
      Ti.API.info("module is =&gt; " + ci_geofencing)

      ci_geofencing.startGeoFencing(regionArray, (event) ->
        Ti.API.info('info ' + JSON.stringify(event, null, 2))

        if event.type is "entered_region"
          callbacks.onenter(event) if callbacks.onenter?

        if event.type is "monitoring_region"
          Ti.API.info 'monitoring a region'

        if event.type is "exited_region"
          Ti.API.info 'exit event'
          callbacks.onexit(event) if callbacks.onexit?
      )
    else if OS_ANDROID
      alert 'Need to figure this one out dude'

  stop: ->
    Ti.API.info 'stopping geofence'
    ci_geofencing.stopGeoFencing()
    # ci_geofencing = null


module.exports = Geofence
