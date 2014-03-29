Parse.Cloud.define("connectUsers", function(request, response) {
  var user1 = request.user;
  var user2 = null;

  var query = new Parse.Query("ConnectedContact");
  query.equalTo("parent", user1);

  query.find().then(function(connectedContacts) {
    if (connectedContacts.length > 0) {
      var connectedContact = connectedContacts[0];

      connectedContact.get("emails").forEach(function(email, index, emails) {
        var innerQuery = new Parse.Query("User")
        innerQuery.equalTo("email", email)
        innerQuery.find().then(function(users) {
          if (users.length > 0) {
            user2 = users[0];
          }
          else {
            console.log("Didn't find user this round");
          }
          if (index === emails.length - 1) {
            if (user2 !== null) {
              console.log("It's all over and we've got our user");
              var ConnectedUsers = Parse.Object.extend("ConnectedUsers");
              connectedUsers = new ConnectedUsers();
              connectedUsers.set("parent", Parse.User.current());
              connectedUsers.set("connectedUser", user2);
              connectedUsers.save();
              response.success();
            }
          }
        });
      });

    }
  });

});

Parse.Cloud.define("leftWorkPush", function(request, response) {
  if (request.params.identifier === "Work") {
    user = request.user
    objectId = user.id

    var query = new Parse.Query("ConnectedUsers");
    query.equalTo("parent", user);

    query.find().then(function(connectedUsers) {
      if (connectedUsers.length === 0) return;
      user2 = connectedUsers[0].get("connectedUser");
      return user2.fetch();
    }).then(function(user2) {
        Parse.Push.send(
          {
            channels: [user2.id],
            data: {
              alert: user.get("name").split(" ")[0] + " just left work!",
              badge: 0,
              sound: ""
            }
          });
        Parse.Push.send(
          {
            channels: [objectId],
            data: {
              alert: "Heads up: We just let " + user2.get("name").split(" ")[0] + " know you've left work.",
              badge: 0,
              sound: ""
            }
          });
        Beacon = Parse.Object.extend("Beacon");
        beacon = new Beacon();
        beacon.set(request.params);
        beacon.set("parent", Parse.User.current());
        beacon.save();
        Parse.Analytics.track('exit', {
          fenceId: request.params.identifier,
          device: request.params.device
        });
        response.success();
      });
  }
  else {
    Parse.Analytics.track('exit', {
      fenceId: request.params.identifier,
      device: request.params.device
    });
    response.success();
  }

});
