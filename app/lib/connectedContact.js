var ConnectedContact, ConnectedContactFactory;

ConnectedContact = Parse.Object.extend("ConnectedContact");

ConnectedContactFactory = {
  findOrCreate: function(params) {
    return this.find({
      success: (function(_this) {
        return function(results) {
          if (results.length === 0) {
            return _this.create(params);
          } else {
            return _this.update(results[0], params);
          }
        };
      })(this),
      error: function() {
        return Ti.API.info('Looks like something went wrong!');
      }
    });
  },
  find: function(callbacks) {
    var query;
    query = new Parse.Query(ConnectedContact);
    query.equalTo("parent", Parse.User.current());
    return query.find({
      success: function(results) {
        return callbacks.success(results);
      },
      error: function(error) {
        return callbacks.error();
      }
    });
  },
  create: function(params) {
    var connectedContact;
    connectedContact = new ConnectedContact();
    connectedContact.set(params);
    connectedContact.set("parent", Parse.User.current());
    Ti.API.info("Saving connected contact");
    connectedContact.save();
    return Ti.API.info("New connected contact");
  },
  update: function(connectedContact, params) {
    connectedContact.set(params);
    Ti.API.info("Updating connected contact");
    connectedContact.save();
    return Ti.API.info("Connected contact updated");
  }
};

module.exports = ConnectedContactFactory;

//# sourceMappingURL=connectedContact.js.map
