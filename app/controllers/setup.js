var args;

args = arguments[0] || {};

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
  if (e.currentPage === 1) {
    Ti.API.info('focus work address');
    return setTimeout(function() {
      var input;
      input = Alloy.createController('setupWorkAddress').getView('workAddress');
      Ti.API.debug(input);
      return input.focus();
    }, 300);
  }
});

$.setup.addEventListener('scroll', function(e) {
  var currentPage, currentPageAsFloat, opacity, views;
  currentPageAsFloat = e.currentPageAsFloat;
  currentPage = Math.floor(e.currentPageAsFloat);
  views = $.pagingControl.children;
  opacity = currentPageAsFloat - currentPage;
  if (opacity < 0.1) {
    opacity = 0.1;
  }
  return views[currentPage].setOpacity(opacity);
});

//# sourceMappingURL=setup.js.map
