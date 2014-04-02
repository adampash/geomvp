var LeaveWindow, LeaveWindowFactory;

LeaveWindow = Parse.Object.extend("LeaveWindow");

LeaveWindowFactory = {
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
    query = new Parse.Query(LeaveWindow);
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
    var leaveWindow;
    leaveWindow = new LeaveWindow();
    leaveWindow.set(params);
    leaveWindow.set("parent", Parse.User.current());
    Ti.API.info("Saving new work address");
    leaveWindow.save();
    return Ti.API.info("New work address saved");
  },
  update: function(leaveWindow, params) {
    leaveWindow.set(params);
    Ti.API.info("Updating work address");
    leaveWindow.save();
    return Ti.API.info("Work address updated");
  }
};

module.exports = LeaveWindowFactory;

//# sourceMappingURL=leaveWindow.js.map
