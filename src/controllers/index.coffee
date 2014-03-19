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

openLogin = ->
  Ti.API.info "Open login"
  login = Alloy.createController('login').getView()
  login.open()

launchSetup = ->
  Ti.API.info "Launch setup"
  setup = Alloy.createController('setupWorkAddress').getView()
  setup.open()


# Open the index page
$.index.open()

# If user isn't logged in, prompt user
# If setup isn't complete, launch setup
currentUser = Parse.User.current()
if currentUser
  Ti.API.info "User is currently logged in: " + currentUser.id
  if Alloy.Globals.setupComplete
    Ti.API.info "Setup is complete"
  else
    launchSetup()
else
  openLogin()
