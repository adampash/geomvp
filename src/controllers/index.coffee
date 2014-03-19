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
  login = Alloy.createController('login').getView()
  login.open()

currentUser = Parse.User.current()
if currentUser
  Ti.API.info "Current user id: " + currentUser.id
else
  openLogin()

$.index.open()
