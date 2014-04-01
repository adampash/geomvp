Parse = require('tiparse')(
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K'
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
)
Analytics = require 'analytics'

debugNotification = (type, e) ->
  Ti.API.info 'debugNotification'
  Ti.Media.vibrate()
  notification = Ti.App.iOS.scheduleLocalNotification
    alertBody: 'Triggered ' + type + 'through ' + e.identifier
    alertAction:"Re-Launch!"
    userInfo:
      "hello":"world"
    date: new Date(new Date().getTime()) # 3 seconds after backgrounding
    sound: "sounds/horn.wav"

GeofenceHandlers =
  onexit: (e) ->
    Ti.API.info 'Elvis has left the building'
    e.device = Ti.Platform.model
    Titanium.Geolocation.purpose = "Determine your location"
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST
    Ti.Geolocation.getCurrentPosition (position) ->
      e.coords = position.coords
      e.latitude = position.coords.latitude
      e.longitude = position.coords.longitude
      Parse.Cloud.run 'leftWorkPush', e,
        success: (res) ->
          Ti.API.info 'Parse code successfully ran'
        error: (err) ->
          Ti.API.info 'it did not work'
          Ti.API.info err
  onenter: (e) ->
    Ti.API.info 'Elvis has entered the building'
    e.device = Ti.Platform.model
    Ti.Geolocation.purpose = "Determine your location"
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST
    Ti.Geolocation.getCurrentPosition (position) ->
      e.coords = position.coords
      e.latitude = position.coords.latitude
      e.longitude = position.coords.longitude
      Parse.Cloud.run 'enteredFence', e,
        success: (res) ->
          Ti.API.info 'Parse code successfully ran'
        error: (err) ->
          Ti.API.info 'it did not work'
          Ti.API.info err

module.exports = GeofenceHandlers
