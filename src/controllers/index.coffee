Cloud = require 'ti.cloud'
deviceToken = null

createUser = ->
  Cloud.Users.secureCreate
      title: 'Sign Up Here'
      ,
      (e) ->
        if (e.success)
            alert('Success:\\n' + e)
        else
            alert('Error:\\n' +
                ((e.error && e.message) || JSON.stringify(e)))

login = ->
  Cloud.Users.secureLogin
    title: 'Log In Here'
  , (e) ->
    if (e.success)
        alert('Logged in:\n' + Cloud.accessToken)
    else
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)))

subscribe = ->
  Ti.Network.registerForPushNotifications
    types: [
      Ti.Network.NOTIFICATION_TYPE_ALERT,
      Ti.Network.NOTIFICATION_TYPE_BADGE,
      Ti.Network.NOTIFICATION_TYPE_SOUND
    ]
    callback: (e) ->
      alert 'got a push notification!'
    success: (e) ->
      alert 'that was successful'
      deviceToken = e.deviceToken
      registerWithCloud(e)
    error: (e) ->
      Ti.API.debug 'that was an error'
      Ti.API.debug e
      alert e

  alert 'push'

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
