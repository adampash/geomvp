args = arguments[0] || {}
WorkAddress = require 'workAddress'

setLocation = (location) ->
  Ti.API.info "Set location"
  coords = location.coords
  Alloy.Globals.location =
    latitude: coords.latitude
    longitude: coords.longitude

searchAgain = ->
  $.searchForAddress.show()
  $.mapContainer.hide()
  $.workAddress.focus()

finishUp = ->
  workLocation = 
    latitude: $.mapview.annotations[0].latitude
    longitude: $.mapview.annotations[0].longitude
    address: $.mapview.annotations[0].subtitle
  Ti.App.Properties.setObject('workLocation', workLocation)
  WorkAddress.findOrCreate(workLocation)
  launchNextStep()

launchNextStep = ->
  scrollableView = $.setupWorkAddress.getParent()
  scrollableView.scrollToView scrollableView.currentPage + 1

findAddress = ->
  geo = require 'geo'
  workAddress = $.workAddress.value

  geo.forwardGeocode(workAddress,
    (geodata) ->
      coords = geodata.coords
      Ti.API.info coords

      setPin(geodata.closestResult.formatted_address, coords)
      $.searchForAddress.hide()
      $.mapContainer.show()
      Ti.API.info $.mapContainer
      Ti.API.info $.mapContainer.getVisible()
  )

setPin = (formattedAddress, coords) ->
  if $.mapview.annotations.length > 0
    $.mapview.removeAnnotation($.mapview.annotations[0].title)
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

Ti.Geolocation.purpose = "Share you location"
if (Ti.Geolocation.locationServicesEnabled)
  Ti.Geolocation.addEventListener("location", setLocation)
  Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS
  Ti.Geolocation.distanceFilter = 15
else
  alert("Please enable location services")

focusAddress = ->
  $.workAddress.focus()


$.setupWorkAddress.addEventListener 'open', ->
  workLocation = Ti.App.Properties.getObject('workLocation')
  if workLocation?
    setPin(workLocation.address, workLocation)
  # else
  # focusAddress()
