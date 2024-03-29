// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.Map = require('ti.map');
if (OS_ANDROID) {
  Ti.API.debug("Google Play available???");
  var gpAvailable = Alloy.Globals.Map.isGooglePlayServicesAvailable()
  if (gpAvailable == Alloy.Globals.Map.SUCCESS) {
    Ti.API.debug("SUCCESS");
  }
  else if (gpAvailable == Alloy.Globals.Map.SERVICE_MISSING) {
    Ti.API.debug("MISSING");
  }
  else {
    Ti.API.debug("SOMETHING ELSE");
  }
}

Alloy.Globals.halfWidth = Ti.UI.Size / 2

Alloy.Globals.geofence = require('geofence')
Alloy.Globals.ci_geofencing = require('ci.geofencing')


// Set up API keys
var config = require('config');
if (Ti.App.deployType === "test" || Ti.App.deployType === 'development') {
  var parseKeys = config.parseDev;
}
else {
  var parseKeys = config.parseAdHoc;
}

Ti.API.info("Deploy type is: " + Ti.App.deployType);
Ti.API.info(Alloy.CFG);
Ti.API.info(JSON.stringify(parseKeys));

Alloy.Globals.parseKeys = parseKeys;
