var args, cancel, completeSetup, control, numPages, pager, pagerControl, _i, _len;

args = arguments[0] || {};

cancel = function() {
  return $.editSettings.close();
};

completeSetup = function() {
  return $.editSettings.close();
};

$.editSettings.addEventListener('scrollend', function(e) {
  var activeView, completeMessage, contactName, currentPage, helper, message, name, pushMessage, time;
  if (e.currentPage != null) {
    currentPage = e.currentPage;
    Ti.API.debug($.pagingControl.children[currentPage]);
    $.pagingControl.children[currentPage].setOpacity(1.0);
    activeView = $.scrollableView.getViews()[currentPage];
    Ti.API.debug(activeView.id);
    if (activeView.id === "login") {
      Ti.API.info('focus registration form');
      activeView.children[1].children[1].focus();
    }
    if (activeView.id === "setupWorkAddress") {
      Ti.API.info('focus work address');
      if (Ti.App.Properties.getObject('workLocation') == null) {
        activeView.children[1].children[0].focus();
      }
    }
    if (activeView.id === "chooseContact") {
      helper = require('helper');
      Ti.API.debug("Need to update text");
      Ti.API.debug(activeView.children[0].children);
      pushMessage = helper.findById(activeView.children[0], 'pushMessage');
      message = helper.findById(activeView.children[0], 'message');
      time = Ti.App.Properties.getString('departureTime');
      message.text = message.text.replace("{tk}", time);
      name = Parse.User.current().get("name").split(" ")[0];
      pushMessage.text = pushMessage.text.replace("{tk}", name);
    }
    if (activeView.id === "complete") {
      helper = require('helper');
      completeMessage = helper.findById(activeView, 'completeMessage');
      contactName = helper.getContactName();
      return completeMessage.text = completeMessage.text.replace(/\{tk\}/g, contactName);
    }
  }
});

$.editSettings.addEventListener('scroll', function(e) {
  var currentPage, currentPageAsFloat, opacity, views;
  currentPageAsFloat = e.currentPageAsFloat + 1;
  currentPage = Math.floor(e.currentPageAsFloat + 1);
  if (currentPage < $.pagingControl.children.length) {
    views = $.pagingControl.children;
    opacity = currentPageAsFloat - currentPage;
    return views[currentPage].setOpacity(opacity);
  }
});

numPages = $.scrollableView.getViews().length;

pager = require('pager');

pagerControl = pager.create(numPages);

for (_i = 0, _len = pagerControl.length; _i < _len; _i++) {
  control = pagerControl[_i];
  $.pagingControl.add(control);
}

//# sourceMappingURL=editSettings.js.map
