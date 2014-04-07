var args, changeToLogin, changeToRegister, createUser, focusEmail, focusPassword, getUserCredentials, launchSetup, loginUser, registerForPush;

args = arguments[0] || {};

launchSetup = function() {
  var scrollableView;
  Ti.API.info("Launch setup");
  scrollableView = $.login.getParent();
  return scrollableView.scrollToView(scrollableView.currentPage + 1);
};

focusEmail = function() {
  return $.email.focus();
};

focusPassword = function() {
  return $.password.focus();
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
      return Parse.Cloud.run('connectUsers', null, {
        success: function(res) {
          return Ti.API.info('Parse code successfully ran');
        },
        error: function(err) {
          Ti.API.info('it did not work');
          return Ti.API.info(err);
        }
      });
    },
    error: function(user, error) {
      return alert("Error: " + error.code + " " + error.message);
    }
  });
};

changeToLogin = function() {
  $.name.hide();
  $.changeToLogin.hide();
  return $.changeToRegister.show();
};

changeToRegister = function() {
  $.name.show();
  $.changeToLogin.show();
  return $.changeToRegister.hide();
};

loginUser = function() {
  var userCredentials;
  userCredentials = getUserCredentials();
  return Parse.User.logIn(userCredentials.email, userCredentials.password).then(function(user) {
    return registerForPush();
  }, function(error) {
    alert('Error');
    return alert(JSON.stringify(error));
  });
};

registerForPush = function() {
  var PushRegistration;
  launchSetup();
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
