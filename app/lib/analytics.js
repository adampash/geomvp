var Analytics;

Analytics = {
  track: function(event, dimensions) {
    return Parse.Analytics.track(event, dimensions);
  }
};

module.exports = Analytics;

//# sourceMappingURL=analytics.js.map
