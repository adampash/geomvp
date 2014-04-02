ParsePush = require 'parsePush'

PushRegistration =
  subscribe: ->
    if OS_IOS
      # if Ti.Network.remoteNotificationsEnabled
      #   Ti.API.info 'notifications are already enabled'
      # else
        Ti.Network.registerForPushNotifications
          types: [
            Ti.Network.NOTIFICATION_TYPE_ALERT,
            Ti.Network.NOTIFICATION_TYPE_BADGE,
            Ti.Network.NOTIFICATION_TYPE_SOUND
          ]
          callback: (e) ->
            alert JSON.stringify e
            Ti.Media.vibrate()
          success: (e) =>
            deviceToken = e.deviceToken
            @registerWithParse(e)
          error: (e) ->
            Ti.API.debug 'that was an error'
            Ti.API.debug e
            alert JSON.stringify e

    else if OS_ANDROID
      alert 'need to register for push on android'

  registerWithParse: (e) ->
    appConfig = require 'appConfig'
    ParsePush.register
      deviceType: 'ios'
      deviceToken: e.deviceToken
      channels: [Parse.User.current().id]
      appName: appConfig.name
      # timeZone: "America/Los_Angeles"
    , @registeredWithParse
    , @errorFromParse

  registeredWithParse: (e, status) ->
    Ti.API.info 'It worked'
    Ti.API.info JSON.stringify e
  errorFromParse: (e) ->
    Error = Parse.Object.extend "Error"
    error = new Error()
    error.set e
    error.set 'when', 'registering push notifications: registerForPush'
    error.save()
    alert "We had trouble registering your device for push notifications. We're looking into it."
    alert JSON.stringify e


module.exports = PushRegistration
