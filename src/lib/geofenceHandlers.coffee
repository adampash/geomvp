Parse = require('tiparse')(
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K'
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
)

GeofenceHandlers =
  onexit: ->
    Ti.API.info 'Elvis has left the building'
    Parse.Cloud.run 'testpush', {},
      success: (res) ->
        Ti.API.info 'push notification successfully sent'
      error: (err) ->
        Ti.API.info 'it did not work'
        Ti.API.info err
  onenter: ->
    Ti.API.info 'Elvis has entered the building'

module.exports = GeofenceHandlers
