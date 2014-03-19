PushRegistration =
  subscribe: ->
    if OS_IOS
      if Ti.Network.remoteNotificationsEnabled
        alert 'all is well'
      else
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
            @registerWithParse(e)
          error: (e) ->
            Ti.API.debug 'that was an error'
            Ti.API.debug e

            alert JSON.stringify e
    else if OS_ANDROID
      alert 'need to register for push on android'

  registerWithParse: (e) ->
    ParsePush.register
      deviceType: 'ios'
      deviceToken: e.deviceToken
      channels: [Parse.User.current().id]
    , @registeredWithParse
    , @errorFromParse

  registeredWithParse: (e, status) ->
    alert 'It worked'
    alert JSON.stringify e
    alert status
  errorFromParse: (e) ->
    alert 'It did not work'


module.exports = PushRegistration
