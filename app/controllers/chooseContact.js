var addressBookDisallowed, args, completeSetup, contactError, init, launchContactPicker, performAddressBookFunction, setContact,
  __hasProp = {}.hasOwnProperty;

args = arguments[0] || {};

launchContactPicker = function() {
  if (Ti.Contacts.contactsAuthorization === Ti.Contacts.AUTHORIZATION_AUTHORIZED) {
    return performAddressBookFunction();
  } else if (Ti.Contacts.contactsAuthorization === Ti.Contacts.AUTHORIZATION_UNKNOWN) {
    return Ti.Contacts.requestAuthorization(function(e) {
      if (e.success) {
        return performAddressBookFunction();
      } else {
        return addressBookDisallowed();
      }
    });
  } else {
    return addressBookDisallowed();
  }
};

performAddressBookFunction = function() {
  Ti.API.info('good stuff');
  return Ti.Contacts.showContacts({
    animated: true,
    selectedPerson: setContact,
    fields: ['phone'],
    error: contactError
  });
};

setContact = function(contact) {
  var email, key, _ref;
  Ti.API.info(contact);
  _ref = contact.person.email;
  for (key in _ref) {
    if (!__hasProp.call(_ref, key)) continue;
    email = _ref[key];
    Ti.API.info(email.toString());
  }
  Ti.API.info(contact.person.phone.mobile.toString());
  if (OS_IOS) {
    Ti.App.Properties.setString('contactRecordId', contact.person.recordId);
    return completeSetup();
  } else if (OS_ANDROID) {
    Ti.App.Properties.setString('contactRecordId', contact.person.id);
    return completeSetup();
  }
};

contactError = function(error) {
  return Ti.API.info('There was an error selecting a contact');
};

addressBookDisallowed = function() {
  return Ti.API.info('bad stuff');
};

completeSetup = function() {
  var index, setupView;
  Ti.App.Properties.setBool('setupComplete', true);
  index = Alloy.createController('index').getView();
  index.open();
  setupView = $.chooseContact.getParent().getParent();
  return setupView.close();
};

init = function() {
  var time;
  time = Ti.App.Properties.getString('departureTime');
  return $.message.text = $.message.text.replace("{tk}", time);
};

init();

//# sourceMappingURL=chooseContact.js.map