var WorkAddress;

WorkAddress = {
  create: function(params) {
    var workAddress;
    workAddress = Parse.Object.extend("WorkAddress");
    workAddress.set(params);
    Ti.API.info("Saving work address");
    workAddress.save();
    return Ti.API.info("Work address saved");
  }
};

module.exports = WorkAddress;

//# sourceMappingURL=workAddress.js.map
