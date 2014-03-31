var helper;

helper = {
  normalizePhone: function(num) {
    return num.replace(/[\(\)-\s]/g, '');
  },
  findById: function(view, id) {
    var obj, _i, _len, _ref;
    _ref = view.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obj = _ref[_i];
      if (obj.id === id) {
        return obj;
      }
    }
  }
};

module.exports = helper;

//# sourceMappingURL=helper.js.map
