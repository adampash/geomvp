
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
          alert: "This came from the cloud because you left work!",
          badge: 0,
          sound: ""
        }
      });
    Beacon = Parse.Object.extend("Beacon");
    beacon = new Beacon();
    beacon.set(request.params);
    beacon.set("parent", Parse.User.current());
    beacon.save();
  }
  Parse.Analytics.track('exit', {
    fenceId: request.params.identifier,
    device: request.params.device
  });

  response.success();
});
