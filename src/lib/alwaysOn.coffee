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
        ,
          "title" : "Work-10"
          "latitude" : workLocation.latitude
          "longitude" : workLocation.longitude
          "radius" : 10
        ,
          "title" : "Work-20"
          "latitude" : workLocation.latitude
          "longitude" : workLocation.longitude
          "radius" : 20
        ,
          "title" : "Work-30"
          "latitude" : workLocation.latitude
          "longitude" : workLocation.longitude
          "radius" : 30
        ,
          "title" : "Work-75"
          "latitude" : workLocation.latitude
          "longitude" : workLocation.longitude
          "radius" : 75
        ,
          "title" : "Work-100"
          "latitude" : workLocation.latitude
          "longitude" : workLocation.longitude
          "radius" : 100
        ,
          "title" : "Work-250"
          "latitude" : workLocation.latitude
          "longitude" : workLocation.longitude
          "radius" : 250
        ],
        geofenceHandlers

module.exports = AlwaysOn
