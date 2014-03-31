ParsePush = require 'parsePush'
Parse = require('tiparse')(
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K'
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
)

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
      alert "Feedback received! Thanks so much for taking the time."
      $.feedback.value = ''
      $.feedback.blur()
    , (response) ->
      alert "Sorry, had trouble saving your feedback"

testSinglePush = ->
  Parse.Cloud.run 'testpush', {},
    success: (res) ->
      alert 'it worked'
    error: (err) ->
      alert 'it did not work'

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


# If user isn't logged in, prompt user
# If setup isn't complete, launch setup
# Otherwise, show index
init = ->
  currentUser = Parse.User.current()
  if currentUser
    Ti.API.info "User is currently logged in: " + currentUser.id
    if Ti.App.Properties.getBool('setupComplete')
      Ti.API.info "Setup is complete"
      # workLocation = Ti.App.Properties.getObject('workLocation')

      # if workLocation?
      #   Ti.API.info 'also draw radius now?'
      #   setPin(workLocation.address, workLocation)

      # contactRecordId = Ti.App.Properties.getString('contactRecordId')
      # contact = Ti.Contacts.getPersonByID(parseInt(contactRecordId,10))

      # if contact?
      #   Ti.API.info JSON.stringify contact
      #   name = contact.firstName
      #   name = contact.fullName.split(' ')[0] unless name?
      #   $.contact.text = "we'll send " + name + " a push notification"

      $.index.open()

      if Alloy.Globals.activeFence?
        Alloy.Globals.activeFence.stopGeoFencing()
        Alloy.Globals.activeFence = null
      alwaysOn = require 'alwaysOn'
      alwaysOn.setupGeofence()
      if OS_IOS
        appStates = require 'appStates'
        appStates.setup()

    else
      launchSetup()
  else
    launchSetup()
    # openLogin()

init()
