ParsePush = require 'parsePush'
Parse = require('tiparse')(
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K'
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
)

createUser = ->
  user = new Parse.User()
  user.set 'username', 'aop'
  user.set 'password', 'pass'
  user.set 'email', 'adam.pash+123@gmail.com'

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
      alert JSON.stringify e
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
    channels: [Parse.User.current().id]
  , registeredWithParse
  , errorFromParse

registeredWithParse = (e, status) ->
  alert 'It worked'
  alert JSON.stringify e
  alert status
errorFromParse = (e) ->
  alert 'It did not work'

testSinglePush = ->
  Parse.Cloud.run 'testpush', {},
    success: (res) ->
      alert 'it worked'
      alert res
    error: (err) ->
      alert 'it did not work'

$.index.open()

openLogin = ->
  login = Alloy.createController('login').getView()
  login.open()

currentUser = Parse.User.current()
if currentUser
  Ti.API.info "Current user id: " + currentUser.id
  openLogin()
else
  openLogin()


