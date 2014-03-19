args = arguments[0] || {}

Ti.API.info 'setting up some business'

report = ->
  alert 'clicked'

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
  alert 'almost done!'

findAddress = ->
  geo = require 'geo'
  workAddress = $.workAddress.value

  geo.forwardGeocode(workAddress,
    (geodata) ->
      coords = geodata.coords
      Ti.API.info coords

      $.mapview.region =
        latitude: coords.latitude
        longitude: coords.longitude
        latitudeDelta: 0.01
        longitudeDelta: 0.01

      workLocation = Alloy.Globals.Map.createAnnotation
        latitude:coords.latitude
        longitude:coords.longitude
        title:"Your work"
        subtitle:geodata.closestResult.formatted_address
        pincolor:Alloy.Globals.Map.ANNOTATION_RED
        id: 'workPin'

      $.mapview.addAnnotation workLocation
      Ti.API.info JSON.stringify workLocation
      # $.mapview.fireEvent 'click'
      workLocation.fireEvent 'click'
      $.confirm.show()
      # workLocation.select()

  )

Ti.Geolocation.purpose = "Share you location"
if (Ti.Geolocation.locationServicesEnabled)
  Ti.Geolocation.addEventListener("location", setLocation)
  Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS
  Ti.Geolocation.distanceFilter = 15
else
  alert("Please enable location services")

$.setupWorkAddress.addEventListener 'open', ->
  $.workAddress.focus()
