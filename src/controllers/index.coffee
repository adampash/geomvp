ParsePush = require 'parsePush'
Parse = require('tiparse')(
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K'
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
)

testSinglePush = ->
  Parse.Cloud.run 'testpush', {},
    success: (res) ->
      alert 'it worked'
    error: (err) ->
      alert 'it did not work'

startOver = ->
  Parse.User.logOut()
  Ti.App.Properties.setBool('setupComplete', false)
  init()

openLogin = ->
  Ti.API.info "Open login"
  login = Alloy.createController('login').getView()
  login.open()

launchSetup = ->
  Ti.API.info "Launch setup"
  setup = Alloy.createController('setupWorkAddress').getView()
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

setupGeofence = ->
  if OS_IOS
    ci_geofencing = require('ci.geofencing')
    Ti.API.info("module is =&gt; " + ci_geofencing)

    workLocation = Ti.App.Properties.getObject('workLocation')

    regions = []
    regions.push
      "title" : "Work"
      "latitude" : workLocation.latitude
      "longitude" : workLocation.longitude
      "radius" : 50


    ci_geofencing.startGeoFencing(regions, (event) ->
      Ti.API.info('info ' + JSON.stringify(event, null, 2))

      if event.type is "entered_region"
        # ci_geofencing.stopGeoFencing()
        alert("ENTERED REGION!")

      if event.type is "monitoring_region"
        # ci_geofencing.stopGeoFencing()
        alert("MONITORING REGION!")

      if event.type is "exited_region"
        # ci_geofencing.stopGeoFencing();
        # alert("LEFT REGION!")
        Parse.Cloud.run 'testpush', {},
          success: (res) ->
            alert 'it worked'
          error: (err) ->
            alert 'it did not work'
    )

# If user isn't logged in, prompt user
# If setup isn't complete, launch setup
# Otherwise, show index
init = ->
  currentUser = Parse.User.current()
  if currentUser
    Ti.API.info "User is currently logged in: " + currentUser.id
    if Ti.App.Properties.getBool('setupComplete')
      Ti.API.info "Setup is complete"
      workLocation = Ti.App.Properties.getObject('workLocation')

      if workLocation?
        Ti.API.info 'also draw radius now?'
        setPin(workLocation.address, workLocation)

      contactRecordId = Ti.App.Properties.getString('contactRecordId')
      contact = Ti.Contacts.getPersonByID(parseInt(contactRecordId,10))

      if contact?
        Ti.API.info JSON.stringify contact
        name = contact.firstName
        name = contact.fullName.split(' ')[0] unless name?
        $.contact.text = "we'll send " + name + " a push notification"

      $.index.open()

      setupGeofence()

    else
      launchSetup()
  else
    openLogin()

init()
