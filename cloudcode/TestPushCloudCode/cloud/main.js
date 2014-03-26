
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("testpush", function(request, response) {
  user = request.user
  objectId = user.id
  if (request.params.identifier === "Work") {
    Parse.Push.send(
      {
        channels: [objectId],
        data: {
          alert: "This came from the cloud because you left work!"
        }
      });
  }
  Parse.Analytics.track('exit', { fenceId: request.params.identifier });

  response.success();
});
