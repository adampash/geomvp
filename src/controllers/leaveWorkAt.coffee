args = arguments[0] || {}
time = {}

saveTime = ->
  Ti.App.Properties.setString('departureTime', timeToString())

  LeaveWindow = require 'leaveWindow'
  LeaveWindow.findOrCreate(
    humanTime: timeToString()
    utcTime: getUTCTime()
  )

  launchNextStep()

launchNextStep = ->
  scrollableView = $.leaveWorkAt.getParent()
  scrollableView.scrollToView 3
  # chooseContact = Alloy.createController('chooseContact').getView()
  # chooseContact.open()
  # $.leaveWorkAt.close()

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


  # Ti.API.info hour
  # Ti.API.info parseInt time.minute
  # moment(
  #   hour: hour
  #   minute: parseInt(time.minute)
  # ).format()

setTime = (event) ->
  time =
    hour: event.selectedValue[0]
    minute: event.selectedValue[1]
    meridian: event.selectedValue[2]

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
    $.picker.setSelectedRow 0, setRows.hour, true
    $.picker.setSelectedRow 1, setRows.minute, true
    $.picker.setSelectedRow 2, setRows.meridian, true
  , 100

init()
