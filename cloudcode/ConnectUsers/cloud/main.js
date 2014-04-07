Parse.Cloud.define("connectUsers", function(request, response) {
  var user1 = request.user;
  var user2 = null;

  var connectedUserQuery = new Parse.Query("ConnectedUsers");
  connectedUserQuery.equalTo("parent", user1);

  connectedUserQuery.find().then(function(connectedUsers) {
    if (connectedUsers.length > 0) {
      var failed = new Parse.Promise();
      failed.reject("This user is already connected");
      return failed;
    }
    else {
      var query = new Parse.Query("ConnectedContact");
      query.equalTo("parent", user1);

      return query.find();
    }
  }).then(function(connectedContacts) {
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
              if (request.params.thenPush) {
                console.log("Now try pushing again");
                request.params.secondTry = true
                Parse.Cloud.run("leftWorkPush", request.params);
              }
              response.success();
            }
            else {
              response.error("No user to connect to");
            }
          }
        });
      });
    }
  }, function(err) {
    response.error("Broke out: " + err);
  });

});

Parse.Cloud.define("leftWorkPush", function(request, response) {

  if (!request.params.secondTry) {
    var LeftFence = Parse.Object.extend("LeftFence");
    var leftFence = new LeftFence();
    leftFence.set(request.params);
    leftFence.set("parent", Parse.User.current());
    leftFence.save();
  }

  if (request.params.identifier === "Work") {
    var user = request.user
    var objectId = user.id

    var timeQuery = new Parse.Query("LeaveWindow");
    timeQuery.equalTo("parent", user);

    timeQuery.find().then(function (leaveWindows) {
      var leaveWindow = leaveWindows[0];
      var utcTime = leaveWindow.get("utcTime");

      var targetDate = new Date()
      targetDate.setUTCHours(utcTime.hour);
      targetDate.setUTCMinutes(utcTime.minute);
      var currentDate = new Date();
      var timeDiffInMinutes = (targetDate.getTime() - currentDate.getTime())/1000/60;

      console.log("Time diff in minutes:");
      console.log(timeDiffInMinutes);

      if (timeDiffInMinutes > -240 && timeDiffInMinutes < 30) {
        var query = new Parse.Query("ConnectedUsers");
        query.equalTo("parent", user);

        request.params.minutesToWindow = timeDiffInMinutes;

        return query.find();
      }
      else {
        console.log("Too soon to send notification");
        var failed = new Parse.Promise();
        failed.reject("It's not time to send a left-work notification");
        return failed;
      }
    }).then(function(connectedUsers) {
      if (connectedUsers.length === 0 && !request.params.secondTry) {
        request.params.thenPush = true
        Parse.Cloud.run("connectUsers", request.params,
          {
            success: function(response) {
              console.log("Was able to connect user, try again");
            },
            error: function(error) {
              console.log("There was an error");
            }
          }
        );
        var failed = new Parse.Promise();
        failed.reject("There was no connected user to push to");
        return failed;
      }
      else {
        user2 = connectedUsers[0].get("connectedUser");
        return user2.fetch();
      }
    }).then(function(user2) {
      if (user2) {
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
        response.success("Sent a beacon");
      }
      else {
        response.error("no user2 to send to");
      }
    }, function(error) {
      return response.error("Broke out of chain: " + error);
    });
  }
  else {
  //   Parse.Analytics.track('exit', {
  //     fenceId: request.params.identifier,
  //     device: request.params.device
  //   });
    response.success("Left: " + request.params.identifier);
  }

});

// not currently in use
Parse.Cloud.define("sendSMS", function(request, response) {
  if (request.params.identifier === 'Work') {
    user = request.user;

    var query = new Parse.Query("ConnectedContact");
    query.equalTo("parent", user);

    query.find().then(function(connectedContacts) {
      if (connectedContacts.length === 0) return;
      connectedContact = connectedContacts[0];
      return connectedContact.fetch();
    }).then(function(contact) {
      phone = connectedContact.get("phones")[0];

      // Require and initialize the Twilio module with your credentials
      var client = require('twilio')('AC635a5d0bfefb56f649818b69a2bf479c', 'a56935fef0015d936733a94da9b34a6f');

      // Send an SMS message
      client.sendSms({
        to:'+' + phone,
        from: '+14506667788',
        body: user.get("name").split(" ")[0] + " just left work!"
      }, function(err, responseData) { 
        if (err) {
          console.log(err);
        } else {
          console.log(responseData.from); 
          console.log(responseData.body);
        }
      }
      );
    });
  }
});

Parse.Cloud.define("enteredFence", function(request, response) {
  var EnteredFence = Parse.Object.extend("EnteredFence");
  var enteredFence = new EnteredFence();
  enteredFence.set(request.params);
  enteredFence.set("parent", Parse.User.current());
  enteredFence.save();

  response.success();

    // Analytics.track 'entered',
    //   fenceId: e.identifier
    //   device: Ti.Platform.model
});

Parse.Cloud.define("testapush", function(request, response) {
  user = request.user
  objectId = user.id

  Parse.Push.send(
    {
      channels: [objectId],
      data: {
        alert: "This is only a test",
        badge: 0,
        sound: ""
      }
    });

  response.success();
});
