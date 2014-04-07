var InstallProgress, InstallProgressFactory;

InstallProgress = Parse.Object.extend("InstallProgress");

InstallProgressFactory = {
  findOrCreate: function(params) {
    Ti.API.debug(params);
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
    query = new Parse.Query(InstallProgress);
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
    var installProgress;
    installProgress = new InstallProgress();
    installProgress.set(params);
    installProgress.set("parent", Parse.User.current());
    Ti.API.info("Saving installProgress");
    installProgress.save();
    return Ti.API.info("New installProgress saved");
  },
  update: function(installProgress, params) {
    installProgress.set(params);
    Ti.API.info("Updating InstallProgress");
    installProgress.save();
    return Ti.API.info("InstallProgress updated");
  }
};

module.exports = InstallProgressFactory;

//# sourceMappingURL=installProgress.js.map
