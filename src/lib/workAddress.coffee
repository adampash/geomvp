Parse = Parse || require('tiparse')(
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K'
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
)

WorkAddress = Parse.Object.extend("WorkAddress")

WorkAddressFactory =
  findOrCreate: (params) ->
    @find
      success: (results) ->
        workAddress = results[0]
        workAddress.set params
        Ti.API.info "Updating work address"
        workAddress.save()
        Ti.API.info "Work address updated"

      error: ->
        workAddress = new WorkAddress()
        workAddress.set params
        workAddress.set "parent", Parse.User.current()
        Ti.API.info "Saving new work address"
        workAddress.save()
        Ti.API.info "New work address saved"

  find: (callbacks) ->
    query = new Parse.Query(WorkAddress)
    query.equalTo("parent", Parse.User.current())
    query.find(
      success: (results) ->
        callbacks.success(results)
      error: (error) ->
        callbacks.error()
    )

module.exports = WorkAddressFactory

