var WorkAddress, WorkAddressFactory;

WorkAddress = Parse.Object.extend("WorkAddress");

WorkAddressFactory = {
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
    query = new Parse.Query(WorkAddress);
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
    var workAddress;
    workAddress = new WorkAddress();
    workAddress.set(params);
    workAddress.set("parent", Parse.User.current());
    Ti.API.info("Saving new work address");
    workAddress.save();
    return Ti.API.info("New work address saved");
  },
  update: function(workAddress, params) {
    workAddress.set(params);
    Ti.API.info("Updating work address");
    workAddress.save();
    return Ti.API.info("Work address updated");
  }
};

module.exports = WorkAddressFactory;

//# sourceMappingURL=workAddress.js.map
