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
    debugNotification('onexit', e)
    e.device = Ti.Platform.model
    Parse.Cloud.run 'leftWorkPush', e,
      success: (res) ->
        Ti.API.info 'Parse code successfully ran'
      error: (err) ->
        Ti.API.info 'it did not work'
        Ti.API.info err
  onenter: (e) ->
    Ti.API.info 'Elvis has entered the building'
    debugNotification('onenter', e)
    Analytics.track 'entered',
      fenceId: e.identifier
      device: Ti.Platform.model

module.exports = GeofenceHandlers
