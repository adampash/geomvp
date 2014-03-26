Parse = require('tiparse')(
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K'
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
)

GeofenceHandlers =
  onexit: (e) ->
    Ti.API.info 'Elvis has left the building'
    Parse.Cloud.run 'testpush', e,
      success: (res) ->
        Ti.API.info 'Parse code successfully ran'
      error: (err) ->
        Ti.API.info 'it did not work'
        Ti.API.info err
  onenter: ->
    Ti.API.info 'Elvis has entered the building'

module.exports = GeofenceHandlers
