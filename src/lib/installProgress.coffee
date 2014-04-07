InstallProgress = Parse.Object.extend("InstallProgress")

InstallProgressFactory =
  findOrCreate: (params) ->
    Ti.API.debug params
    @find
      success: (results) =>
        if results.length is 0
          @create params
        else
          @update results[0], params

      error: ->
        Ti.API.info 'Looks like something went wrong!'

  find: (callbacks) ->
    query = new Parse.Query(InstallProgress)
    query.equalTo("parent", Parse.User.current())
    query.find(
      success: (results) ->
        callbacks.success(results)
      error: (error) ->
        callbacks.error()
    )

  create: (params) ->
    installProgress = new InstallProgress()
    installProgress.set params
    installProgress.set "parent", Parse.User.current()
    Ti.API.info "Saving installProgress"
    installProgress.save()
    Ti.API.info "New installProgress saved"

  update: (installProgress, params) ->
    installProgress.set params
    Ti.API.info "Updating InstallProgress"
    installProgress.save()
    Ti.API.info "InstallProgress updated"


module.exports = InstallProgressFactory

