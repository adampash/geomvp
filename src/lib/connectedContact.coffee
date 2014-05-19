ConnectedContact = Parse.Object.extend("ConnectedContact")

ConnectedContactFactory =
  findOrCreate: (params) ->
    @find
      success: (results) =>
        if results.length is 0
          @create params
        else
          @update results[0], params

      error: ->
        Ti.API.info 'Looks like something went wrong!'

  find: (callbacks) ->
    query = new Parse.Query(ConnectedContact)
    query.equalTo("parent", Parse.User.current())
    query.find(
      success: (results) ->
        callbacks.success(results)
      error: (error) ->
        callbacks.error()
    )

  create: (params) ->
    connectedContact = new ConnectedContact()
    # connectedContact.set params
    connectedContact.set 'name', params.name
    connectedContact.set 'email', []
    for email in emails
      connectedContact.add 'email', email
    connectedContact.set 'email', []
    for phone in phones
      connectedContact.add 'phone', phone
    connectedContact.set "parent", Parse.User.current()
    Ti.API.info "Saving connected contact"
    connectedContact.save()
    Ti.API.info "New connected contact"

  update: (connectedContact, params) ->
    connectedContact.set params
    Ti.API.info "Updating connected contact"
    connectedContact.save()
    Ti.API.info "Connected contact updated"


module.exports = ConnectedContactFactory

