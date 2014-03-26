var Analytics, GeofenceHandlers, Parse;

Parse = require('tiparse')({
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K',
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
});

Analytics = require('analytics');

GeofenceHandlers = {
  onexit: function(e) {
    Ti.API.info('Elvis has left the building');
    return Parse.Cloud.run('testpush', e, {
      success: function(res) {
        return Ti.API.info('Parse code successfully ran');
      },
      error: function(err) {
        Ti.API.info('it did not work');
        return Ti.API.info(err);
      }
    });
  },
  onenter: function(e) {
    Ti.API.info('Elvis has entered the building');
    return Analytics.track('entered', {
      fenceId: e.identifier
    });
  }
};

module.exports = GeofenceHandlers;

//# sourceMappingURL=geofenceHandlers.js.map
