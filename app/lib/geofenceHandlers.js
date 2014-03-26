var GeofenceHandlers, Parse;

Parse = require('tiparse')({
  applicationId: '1oZOjHVjsgSksvkBQvoSKBdSrpEXCpz4FTUn7R9K',
  javascriptkey: '4bQEME68IFKo8NCaFN4UCyBzFFeehwiZnjD1lf6v'
});

GeofenceHandlers = {
  onexit: function() {
    Ti.API.info('Elvis has left the building');
    return Parse.Cloud.run('testpush', {}, {
      success: function(res) {
        return Ti.API.info('push notification successfully sent');
      },
      error: function(err) {
        Ti.API.info('it did not work');
        return Ti.API.info(err);
      }
    });
  },
  onenter: function() {
    return Ti.API.info('Elvis has entered the building');
  }
};

module.exports = GeofenceHandlers;

//# sourceMappingURL=geofenceHandlers.js.map
