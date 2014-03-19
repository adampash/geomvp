Cloud = require 'ti.cloud'

ParsePush = require 'parsePush'
Parse = require('tiparse')(
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K'
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
)

Ti.API.info Parse

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

  # Cloud.Users.secureCreate
  #     title: 'Sign Up Here'
  #     ,
  #     (e) ->
  #       if (e.success)
  #           alert('Success:\\n' + e)
  #           alert Cloud.accessToken
  #       else
  #           alert('Error:\\n' +
  #               ((e.error && e.message) || JSON.stringify(e)))

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
      # properties.setString 'deviceToken', e.deviceToken
      # registerWithCloud(e)
      registerWithParse(e)
    error: (e) ->
      Ti.API.debug 'that was an error'
      Ti.API.debug e

      alert JSON.stringify e

registerWithCloud = (e) ->
  Cloud.PushNotifications.subscribe
      channel: 'test'
      device_token: e.deviceToken
      type: 'ios'
  , (e) ->
      if (e.success)
          alert('Subscribed :'+((e.error && e.message) || JSON.stringify(e)))
      else
          alert('Error:\n' +
              ((e.error && e.message) || JSON.stringify(e)))

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

sendTestNotification = () ->
    # Sends an 'This is a test.' alert to specified device if its subscribed to the 'test' channel.
    Cloud.PushNotifications.notifyTokens
        to_tokens: deviceToken
        channel: 'test'
        payload: 'This is a test.'
    , (e) ->
      if (e.success)
          alert('Push notification sent')
      else
          alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)))

$.index.open()
