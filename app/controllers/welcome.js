var args, launchNextStep;

args = arguments[0] || {};

launchNextStep = function() {
  var scrollableView;
  scrollableView = $.welcome.getParent();
  return scrollableView.scrollToView(scrollableView.currentPage + 1);
};

//# sourceMappingURL=welcome.js.map
