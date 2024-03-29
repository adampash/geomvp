/**
 * @aaronksaunders
 * 
 * See more Appcelerator Information on Company Blog
 * blog.clearlyinnovetiove.com
 * 
 */

var TiParse = function(options) {
  Ti.include("parse-1.2.18.js");
  Parse.localStorage = {
    getItem: function(_key) {
      return Ti.App.Properties.getObject(_key);
    },
    setItem: function(_key, _value) {
      return Ti.App.Properties.setObject(_key, _value);
    },
    removeItem: function(_key) {
      return Ti.App.Properties.removeProperty(_key);
    }
  };
  Parse._ajax = function(method, url, data, success, error) {
    var options = {
      success: success,
      error: error
    };
    if ("undefined" != typeof XDomainRequest) return Parse._ajaxIE8(method, url, data)._thenRunCallbacks(options);
    var promise = new Parse.Promise(), handled = !1, xhr = Ti.Network.createHTTPClient({
      timeout: 5e3
    });
    xhr.onreadystatechange = function() {
      if (4 === xhr.readyState) {
        if (handled) return;
        handled = !0;
        if (xhr.status >= 200 && 300 > xhr.status) {
          var response;
          try {
            response = JSON.parse(xhr.responseText);
          } catch (e) {
            promise.reject(e);
          }
          response && promise.resolve(response, xhr.status, xhr);
        } else promise.reject(xhr);
      }
    };
    xhr.open(method, url, !0);
    xhr.setRequestHeader("Content-Type", "text/plain");
    Parse._isNode && xhr.setRequestHeader("User-Agent", "Parse/" + Parse.VERSION + " (NodeJS " + process.versions.node + ")");
    xhr.send(data);
    return promise._thenRunCallbacks(options);
  };

  Parse.initialize(options.applicationId, options.javascriptkey);
  return Parse;
};

module.exports = TiParse;
