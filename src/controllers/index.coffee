Cloud = require 'ti.cloud'

doClick = (e) ->
    alert 'OMG ' + $.label.text
    createUser()

createUser = ->
  Cloud.Users.secureCreate
      title: 'Sign Up Here'
      ,
      (e) ->
        if (e.success)
            alert('Success:\\n' +
                'accessToken: ' + e.accessToken + '\\n' +
                'expiresIn: ' + e.expiresIn)
        else
            alert('Error:\\n' +
                ((e.error && e.message) || JSON.stringify(e)))

$.index.open()
