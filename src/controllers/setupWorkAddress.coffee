args = arguments[0] || {}

setLocation = (location) ->
  Ti.API.info "Set location"
  coords = location.coords
  Alloy.Globals.location =
    latitude: coords.latitude
    longitude: coords.longitude
  # $.mapview.region =
  #   latitude: coords.latitude
  #   longitude: coords.longitude
  #   latitudeDelta: 0.01
  #   longitudeDelta: 0.01

searchAgain = ->
  $.confirm.hide()
  $.workAddress.focus()

finishUp = ->
  workLocation = 
    latitude: $.mapview.annotations[0].latitude
    longitude: $.mapview.annotations[0].longitude
    address: $.mapview.annotations[0].subtitle
  Ti.App.Properties.setObject('workLocation', workLocation)
  launchNextStep()

launchNextStep = ->
  Ti.API.info "Launch next step"
  leaveWorkAt = Alloy.createController('leaveWorkAt').getView()
  leaveWorkAt.open()
  $.setupWorkAddress.close()

launchLastStep = ->
  Ti.API.info "Launch last step"
  chooseContact = Alloy.createController('chooseContact').getView()
  chooseContact.open()
  $.setupWorkAddress.close()

findAddress = ->
  geo = require 'geo'
  workAddress = $.workAddress.value

  geo.forwardGeocode(workAddress,
    (geodata) ->
      coords = geodata.coords
      Ti.API.info coords

      setPin(geodata.closestResult.formatted_address, coords)
  )

setPin = (formattedAddress, coords) ->
  $.mapview.region =
    latitude: coords.latitude
    longitude: coords.longitude
    latitudeDelta: 0.01
    longitudeDelta: 0.01

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
  $.confirm.show()

Ti.Geolocation.purpose = "Share you location"
if (Ti.Geolocation.locationServicesEnabled)
  Ti.Geolocation.addEventListener("location", setLocation)
  Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS
  Ti.Geolocation.distanceFilter = 15
else
  alert("Please enable location services")

$.setupWorkAddress.addEventListener 'open', ->
  workLocation = Ti.App.Properties.getObject('workLocation')
  if workLocation?
    setPin(workLocation.address, workLocation)
  else
    $.workAddress.focus()
