var PagingControl;

PagingControl = {
  create: function(numViews) {
    var colors, num, size, view, views, _i;
    Ti.API.info('create a control for ' + numViews + ' pages');
    views = [];
    colors = [];
    size = 100 / numViews;
    for (num = _i = 0; 0 <= numViews ? _i < numViews : _i > numViews; num = 0 <= numViews ? ++_i : --_i) {
      view = Ti.UI.createView({
        opacity: 0.1,
        width: size + "%",
        height: "10dp",
        backgroundColor: colors[num] || 'gray'
      });
      views.push(view);
    }
    views[0].setOpacity(1.0);
    return views;
  }
};

module.exports = PagingControl;

//# sourceMappingURL=pager.js.map
