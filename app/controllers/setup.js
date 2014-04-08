var InstallProgress, args, completeSetup, startOver;

args = arguments[0] || {};

InstallProgress = require('installProgress');

completeSetup = function() {
  var index;
  InstallProgress.findOrCreate({
    greenLight: true
  });
  index = Alloy.createController('index').getView();
  index.open();
  return $.setup.close();
};

startOver = function() {
  var index, view, views, _i, _len;
  views = $.pagingControl.children;
  for (index = _i = 0, _len = views.length; _i < _len; index = ++_i) {
    view = views[index];
    if (index < 3) {
      view.setOpacity(1);
    }
    if (index >= 3) {
      view.setOpacity(0);
    }
  }
  return $.scrollableView.scrollToView(2);
};

$.setup.addEventListener('open', function(e) {
  var control, numPages, pager, pagerControl, _i, _len, _results;
  numPages = $.scrollableView.getViews().length;
  pager = require('pager');
  pagerControl = pager.create(numPages);
  _results = [];
  for (_i = 0, _len = pagerControl.length; _i < _len; _i++) {
    control = pagerControl[_i];
    _results.push($.pagingControl.add(control));
  }
  return _results;
});

$.setup.addEventListener('scrollend', function(e) {
  var activeView, completeMessage, contactName, currentPage, helper, message, name, params, pushMessage, time;
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
      completeMessage.text = completeMessage.text.replace(/\{tk\}/g, contactName);
    }
    if (Parse.User.current()) {
      params = {};
      params[activeView.id] = true;
      return InstallProgress.findOrCreate(params);
    }
  }
});

$.setup.addEventListener('scroll', function(e) {
  var currentPage, currentPageAsFloat, opacity, views;
  currentPageAsFloat = e.currentPageAsFloat + 1;
  currentPage = Math.floor(e.currentPageAsFloat + 1);
  if (currentPage < $.pagingControl.children.length) {
    views = $.pagingControl.children;
    opacity = currentPageAsFloat - currentPage;
    return views[currentPage].setOpacity(opacity);
  }
});

Ti.API.info(args);

if (args.edit) {
  $.setup.addEventListener('open', function() {
    return startOver();
  });
}

//# sourceMappingURL=setup.js.map
