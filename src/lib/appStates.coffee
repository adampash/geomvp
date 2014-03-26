geofence = require 'geofence'

AppStates =
  setup: ->
    Ti.API.info('Registering background service')
    # bgGeofence = Ti.App.iOS.registerBackgroundService({url:'bgGeofence.js'})

    Ti.App.addEventListener 'pause', ->
      Ti.API.info 'app is pause'
      # geofence.stop()
    Ti.App.addEventListener 'paused', ->
      Ti.API.info 'app is paused'
    Ti.App.addEventListener 'resume', ->
      Ti.API.info 'app is resume'
      # geofence.stop()
      # alwaysOn = require 'alwaysOn'
      # alwaysOn.setupGeofence()
    Ti.App.addEventListener 'resumed', ->
      Ti.API.info 'app is resumed'

module.exports = AppStates
