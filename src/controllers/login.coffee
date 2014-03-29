Parse = require('tiparse')(
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K'
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
)

args = arguments[0] || {}

launchSetup = ->
  Ti.API.info "Launch setup"

  scrollableView = $.login.getParent()
  scrollableView.scrollToView 1

createUser = ->
  userCredentials = getUserCredentials()
  user = new Parse.User()
  user.set 'username', userCredentials.email
  user.set 'password', userCredentials.password
  user.set 'email', userCredentials.email
  user.set 'name', userCredentials.name

  user.signUp(null,
    success: (user) ->
      registerForPush()
      Parse.Cloud.run 'connectUsers', null,
        success: (res) ->
          Ti.API.info 'Parse code successfully ran'
        error: (err) ->
          Ti.API.info 'it did not work'
          Ti.API.info err
    ,
    error: (user, error) ->
      alert "Error: " + error.code + " " + error.message
  )

changeToLogin = ->
  $.loginButton.show()
  $.createButton.hide()
  $.name.hide()
  $.changeToLogin.hide()
  $.changeToRegister.show()

changeToRegister = ->
  $.loginButton.hide()
  $.createButton.show()
  $.name.show()
  $.changeToLogin.show()
  $.changeToRegister.hide()

loginUser = ->
  userCredentials = getUserCredentials()
  Parse.User.logIn(
    userCredentials.email,
    userCredentials.password
  ).then(
    (user) ->
      registerForPush()
  , (error) ->
    alert 'Error'
    alert JSON.stringify error
  )

registerForPush = ->
  launchSetup()
  PushRegistration = require 'registerForPush'
  PushRegistration.subscribe()

getUserCredentials = ->
  email:     $.email.value.trim().toLowerCase()
  password:  $.password.value
  name:  $.name.value
