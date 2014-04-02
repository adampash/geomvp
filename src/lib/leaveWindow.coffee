LeaveWindow = Parse.Object.extend("LeaveWindow")

LeaveWindowFactory =
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
    query = new Parse.Query(LeaveWindow)
    query.equalTo("parent", Parse.User.current())
    query.find(
      success: (results) ->
        callbacks.success(results)
      error: (error) ->
        callbacks.error()
    )

  create: (params) ->
    leaveWindow = new LeaveWindow()
    leaveWindow.set params
    leaveWindow.set "parent", Parse.User.current()
    Ti.API.info "Saving new work address"
    leaveWindow.save()
    Ti.API.info "New work address saved"

  update: (leaveWindow, params) ->
    leaveWindow.set params
    Ti.API.info "Updating work address"
    leaveWindow.save()
    Ti.API.info "Work address updated"


module.exports = LeaveWindowFactory
