var Parse, WorkAddress, WorkAddressFactory;

Parse = Parse || require('tiparse')({
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K',
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
});

WorkAddress = Parse.Object.extend("WorkAddress");

WorkAddressFactory = {
  findOrCreate: function(params) {
    return this.find({
      success: function(results) {
        var workAddress;
        workAddress = results[0];
        workAddress.set(params);
        Ti.API.info("Updating work address");
        workAddress.save();
        return Ti.API.info("Work address updated");
      },
      error: function() {
        var workAddress;
        workAddress = new WorkAddress();
        workAddress.set(params);
        workAddress.set("parent", Parse.User.current());
        Ti.API.info("Saving new work address");
        workAddress.save();
        return Ti.API.info("New work address saved");
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
  }
};

module.exports = WorkAddressFactory;

//# sourceMappingURL=workAddress.js.map
