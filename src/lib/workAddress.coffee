WorkAddress = Parse.Object.extend("WorkAddress")

WorkAddressFactory =
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
    query = new Parse.Query(WorkAddress)
    query.equalTo("parent", Parse.User.current())
    query.find(
      success: (results) ->
        callbacks.success(results)
      error: (error) ->
        callbacks.error()
    )

  create: (params) ->
    workAddress = new WorkAddress()
    workAddress.set params
    workAddress.set "parent", Parse.User.current()
    Ti.API.info "Saving new work address"
    workAddress.save()
    Ti.API.info "New work address saved"

  update: (workAddress, params) ->
    workAddress.set params
    Ti.API.info "Updating work address"
    workAddress.save()
    Ti.API.info "Work address updated"


module.exports = WorkAddressFactory

