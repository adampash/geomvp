Cloud = require 'ti.cloud'

ParsePush = require 'parsePush'
Parse = require('tiparse')(
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K'
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
)

currentUser = Parse.User.current()
if currentUser
  Ti.API.info "Current user id: " + currentUser.id
else
  Ti.API.info 'No current user?'


createUser = ->
  user = new Parse.User()
  user.set 'username', 'adampash'
  user.set 'password', 'pass'
  user.set 'email', 'adam.pash@gmail.com'

  user.signUp(null,
    success: (user) ->
      alert 'WHOA, that worked'
    ,
    error: (user, error) ->
      alert "Error: " + error.code + " " + error.message
  )

subscribe = ->
  alert 'register for push'
  Ti.Network.registerForPushNotifications
    types: [
      Ti.Network.NOTIFICATION_TYPE_ALERT,
      Ti.Network.NOTIFICATION_TYPE_BADGE,
      Ti.Network.NOTIFICATION_TYPE_SOUND
    ]
    callback: (e) ->
      alert 'got a push notification!'
    success: (e) ->
      alert 'registration was successful'
      deviceToken = e.deviceToken
      registerWithParse(e)
    error: (e) ->
      Ti.API.debug 'that was an error'
      Ti.API.debug e

      alert JSON.stringify e

registerWithParse = (e) ->
  alert 'register with parse'
  ParsePush.register
    deviceType: 'ios'
    deviceToken: e.deviceToken
    channels: ['']
  , registeredWithParse
  , errorFromParse

registeredWithParse = (e, status) ->
  alert 'It worked'
  alert JSON.stringify e
  alert status
errorFromParse = (e) ->
  alert 'It did not work'

$.index.open()
