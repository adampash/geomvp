Ti.API.info "starting index.js"
ParsePush = require 'parsePush'
Parse = require('tiparse')(
  applicationId: Alloy.Globals.parseKeys.appId
  javascriptkey: Alloy.Globals.parseKeys.appKey
)

geofence = require 'geofenceWrapper'

sendFeedback = ->
  feedbackText = $.feedback.value
  if feedbackText is ""
    $.feedback.focus()

  else
    Feedback = Parse.Object.extend "Feedback"
    feedback = new Feedback()
    feedback.set "text", feedbackText
    feedback.set "parent", Parse.User.current()

    feedback.save().then (response) ->
      Ti.UI.createAlertDialog({
        message: 'Thanks so much for taking the time.'
        ok: 'OK'
        title: 'Feedback received!'
      }).show()
      $.feedback.value = ''
      $.feedback.blur()
    , (response) ->
      Ti.UI.createAlertDialog({
        message: 'Sorry, we had trouble saving your feedback.'
        ok: 'OK'
        title: 'Feedback failed'
      }).show()

testSinglePush = ->
  Parse.Cloud.run 'testapush', {},
    success: (res) ->
      alert 'it worked'
    error: (err) ->
      alert 'it did not work'
      Ti.API.info JSON.stringify err

startOver = ->
  Parse.User.logOut()
  Ti.App.Properties.setBool('setupComplete', null)
  Ti.App.Properties.setObject('workLocation', null)
  Ti.App.Properties.setString('departureTime', null)
  Ti.App.Properties.setString('contactRecordId', null)
  init()

openLogin = ->
  Ti.API.info "Open login"
  login = Alloy.createController('login').getView()
  login.open()

launchSetup = ->
  Ti.API.info "Launch setup"
  setup = Alloy.createController('setup').getView()
  setup.open()
  $.index.close()

setPin = (formattedAddress, coords) ->
  $.mapview.region =
    latitude: coords.latitude
    longitude: coords.longitude
    latitudeDelta: 0.004
    longitudeDelta: 0.004

  workLocation = Alloy.Globals.Map.createAnnotation
    latitude:coords.latitude
    longitude:coords.longitude
    title:"Your work"
    subtitle:formattedAddress
    pincolor:Alloy.Globals.Map.ANNOTATION_RED
    id: 'workPin'

  $.mapview.addAnnotation workLocation
  # Ti.API.info JSON.stringify workLocation
  $.mapview.annotations[0].fireEvent 'click'


$.index.addEventListener 'close', (e) ->
  Ti.API.info 'stop geofencing'
  geofence.stopGeoFencing()


# If user isn't logged in, prompt user
# If setup isn't complete, launch setup
# Otherwise, show index
init = ->
  currentUser = Parse.User.current()
  if currentUser
    Ti.API.info "User is currently logged in: " + currentUser.id
    if Ti.App.Properties.getBool('setupComplete')
      Ti.API.info "Setup is complete"

      $.index.open()

      alwaysOn = require 'alwaysOn'
      alwaysOn.setupGeofence(geofence)
      if OS_IOS
        appStates = require 'appStates'
        appStates.setup()

    else
      launchSetup()
  else
    launchSetup()

init()
