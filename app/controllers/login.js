var Parse, args, changeToLogin, changeToRegister, close, createUser, getUserCredentials, loginUser, registerForPush;

Parse = require('tiparse')({
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K',
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
});

args = arguments[0] || {};

close = function() {
  return $.login.close();
};

createUser = function() {
  var user, userCredentials;
  userCredentials = getUserCredentials();
  user = new Parse.User();
  user.set('username', userCredentials.email);
  user.set('password', userCredentials.password);
  user.set('email', userCredentials.email);
  user.set('name', userCredentials.name);
  return user.signUp(null, {
    success: function(user) {
      registerForPush();
      return close();
    },
    error: function(user, error) {
      return alert("Error: " + error.code + " " + error.message);
    }
  });
};

changeToLogin = function() {
  $.loginButton.show();
  $.createButton.hide();
  $.name.hide();
  $.changeToLogin.hide();
  return $.changeToRegister.show();
};

changeToRegister = function() {
  $.loginButton.hide();
  $.createButton.show();
  $.name.show();
  $.changeToLogin.show();
  return $.changeToRegister.hide();
};

loginUser = function() {
  var userCredentials;
  userCredentials = getUserCredentials();
  return Parse.User.logIn(userCredentials.email, userCredentials.password).then(function(user) {
    alert('Successful login!');
    registerForPush();
    return close();
  }, function(error) {
    alert('Error');
    return alert(JSON.stringify(error));
  });
};

registerForPush = function() {
  var PushRegistration;
  PushRegistration = require('registerForPush');
  return PushRegistration.subscribe();
};

getUserCredentials = function() {
  return {
    email: $.email.value.trim().toLowerCase(),
    password: $.password.value,
    name: $.name.value
  };
};

//# sourceMappingURL=login.js.map
