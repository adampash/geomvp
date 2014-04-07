args = arguments[0] || {}

register = true

Parse = Parse || require('tiparse')(
  applicationId: Alloy.Globals.parseKeys.appId
  javascriptkey: Alloy.Globals.parseKeys.appKey
)

launchSetup = ->
  Ti.API.info "Launch setup"

  scrollableView = $.login.getParent()
  scrollableView.scrollToView scrollableView.currentPage + 1

focusEmail = ->
  $.email.focus()
focusPassword = ->
  $.password.focus()


createUser = ->
  Ti.API.info 'create user'
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

registerOrLogin = ->
  Ti.API.debug "register?", register
  if register
    createUser()
  else
    loginUser()

changeToLogin = ->
  register = false
  $.name.hide()
  $.email.focus()
  $.nameLabel.hide()
  $.changeToLogin.hide()
  $.changeToRegister.show()

changeToRegister = ->
  register = true
  $.name.show()
  $.name.focus()
  $.nameLabel.show()
  $.changeToLogin.show()
  $.changeToRegister.hide()

loginUser = ->
  Ti.API.info 'login user'
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
