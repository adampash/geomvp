var Parse, ParsePush, currentUser, openLogin, testSinglePush;

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
  login = Alloy.createController('login').getView();
  return login.open();
};

currentUser = Parse.User.current();

if (currentUser) {
  Ti.API.info("Current user id: " + currentUser.id);
} else {
  openLogin();
}

$.index.open();

//# sourceMappingURL=index.js.map
