Cloud = require 'ti.cloud'

# securely = require 'bencoding.securely'
# properties = securely.createProperties
#     secret:"901083jjkn38jfsksKJk209jKJXj8"
#     identifier:"deviceToken"
#     accessGroup:"myAccessGroup"
#     encryptFieldNames:false

createUser = ->
  Cloud.Users.secureCreate
      title: 'Sign Up Here'
      ,
      (e) ->
        if (e.success)
            alert('Success:\\n' + e)
            alert Cloud.accessToken
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
      alert 'registration was successful'
      deviceToken = e.deviceToken
      # properties.setString 'deviceToken', e.deviceToken
      registerWithCloud(e)
    error: (e) ->
      Ti.API.debug 'that was an error'
      Ti.API.debug e
      alert e

  Ti.API.info 'registering'

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
