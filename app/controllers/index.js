var Cloud, createUser, doClick;

Cloud = require('ti.cloud');

doClick = function(e) {
  alert('OMG ' + $.label.text);
  return createUser();
};

createUser = function() {
  return Cloud.Users.secureCreate({
    title: 'Sign Up Here'
  }, function(e) {
    if (e.success) {
      return alert('Success:\\n' + 'accessToken: ' + e.accessToken + '\\n' + 'expiresIn: ' + e.expiresIn);
    } else {
      return alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
    }
  });
};

$.index.open();

//# sourceMappingURL=index.js.map
