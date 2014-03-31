geofence = Alloy.Globals.ci_geofencing || require 'ci.geofencing'

Geofence =
  setup: (regionArray, callbacks) ->
    callbacks = callbacks || {}

    if OS_IOS
      geofence.stopGeoFencing()
      Ti.API.info("module is =&gt; " + geofence)

      geofence.startGeoFencing(regionArray, (event) ->
        Ti.API.info('info ' + JSON.stringify(event, null, 2))

        if event.type is "entered_region"
          callbacks.onenter(event) if callbacks.onenter?

        if event.type is "monitoring_region"
          Ti.API.info 'monitoring a region'

        if event.type is "exited_region"
          Ti.API.info 'exit event'
          callbacks.onexit(event) if callbacks.onexit?
      )
      geofence
    else if OS_ANDROID
      alert 'Need to figure this one out dude'

  stop: ->
    Ti.API.info 'stopping geofence'
    geofence.stopGeoFencing()


module.exports = Geofence
