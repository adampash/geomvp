args = arguments[0] || {}
time = {}

saveTime = ->
  Ti.App.Properties.setString('departureTime', timeToString())

  LeaveWindow = require 'leaveWindow'
  LeaveWindow.findOrCreate(
    humanTime: timeToString()
    utcTime: getUTCTime()
    timezoneOffset: new Date().getTimezoneOffset()/60
  )

  launchNextStep()

launchNextStep = ->
  scrollableView = $.leaveWorkAt.getParent()
  scrollableView.scrollToView scrollableView.currentPage + 1

timeToString = ->
  '' + time.hour + ':' + time.minute + ' ' + time.meridian

getUTCTime = ->
  if time.meridian is 'pm'
    hour = parseInt(time.hour) + 12
  else
    hour = parseInt(time.hour)

  date = new Date()
  date.setHours(hour)
  date.setMinutes(parseInt time.minute)

  hour: date.getUTCHours()
  minute: date.getMinutes()


setTime = (event) ->
  time =
    hour: event.selectedValue[0]
    minute: event.selectedValue[1]
    meridian: event.selectedValue[2]

setPicker = ->
  $.picker.setSelectedRow 0, setRows.hour, true
  $.picker.setSelectedRow 1, setRows.minute, true
  $.picker.setSelectedRow 2, setRows.meridian, true

init = ->
  setRows =
    'hour': 5
    'minute': 0
    'meridian': 1

  if Ti.App.Properties.getString('departureTime')
    time = Ti.App.Properties.getString('departureTime')
    hour = parseInt time.split(':')[0]
    minute = parseInt time.split(':')[1].split(' ')[0]
    meridian = time.split(' ')[1]

    setRows.hour = hour - 1
    setRows.minute = minute / 15
    if meridian is 'am'
      setRows.meridian = 0
    else
      setRows.meridian = 1

  setTimeout ->
    Ti.API.info 'setting picker'
    Ti.API.info $.picker
    Ti.API.info setRows
    $.picker.setSelectedRow 0, setRows.hour, true
    $.picker.setSelectedRow 1, setRows.minute, true
    $.picker.setSelectedRow 2, setRows.meridian, true
  , 1000


$.leaveWorkAt.addEventListener 'postlayout', (e) ->
  init()
