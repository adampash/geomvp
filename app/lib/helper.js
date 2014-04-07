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
  },
  getContactName: function() {
    var contact, recordId;
    recordId = Ti.App.Properties.getString('contactRecordId');
    contact = this.getContact(recordId);
    return contact.firstName || contact.fullName.split(" ")[0];
  },
  getContact: function(recordId) {
    var contact;
    contact = Ti.Contacts.getPersonByID(parseInt(recordId));
    return contact;
  }
};

module.exports = helper;

//# sourceMappingURL=helper.js.map
