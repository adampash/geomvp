var Parse, ParsePush, currentUser, launchSetup, openLogin, testSinglePush;

ParsePush = require('parsePush');

Parse = require('tiparse')({
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K',
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
});

testSinglePush = function() {
  return Parse.Cloud.run('testpush', {}, {
    success: function(res) {
      return alert('it worked');
    },
    error: function(err) {
      return alert('it did not work');
    }
  });
};

openLogin = function() {
  var login;
  Ti.API.info("Open login");
  login = Alloy.createController('login').getView();
  return login.open();
};

launchSetup = function() {
  var setup;
  Ti.API.info("Launch setup");
  setup = Alloy.createController('setupWorkAddress').getView();
  return setup.open();
};

currentUser = Parse.User.current();

if (currentUser) {
  Ti.API.info("User is currently logged in: " + currentUser.id);
  if (Alloy.Globals.setupComplete) {
    Ti.API.info("Setup is complete");
    $.index.open();
  } else {
    launchSetup();
  }
} else {
  openLogin();
}

//# sourceMappingURL=index.js.map
