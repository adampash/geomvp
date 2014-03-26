geofenceHandlers = require 'geofenceHandlers'

AlwaysOn =
  setupGeofence: ->
    workLocation = Ti.App.Properties.getObject('workLocation')
    if OS_IOS
      if workLocation?
        geofence = require 'geofence'
        geofence.setup [
          "title" : "Work"
          "latitude" : workLocation.latitude
          "longitude" : workLocation.longitude
          "radius" : 50
        ],
        geofenceHandlers

module.exports = AlwaysOn
