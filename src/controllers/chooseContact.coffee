args = arguments[0] || {}

launchContactPicker = ->
  if Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED
    performAddressBookFunction()
  else if Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN
    Ti.Contacts.requestAuthorization( (e) ->
      if e.success
        performAddressBookFunction()
      else
        addressBookDisallowed()
    )
  else
    addressBookDisallowed()


performAddressBookFunction = () ->
  Ti.API.info 'good stuff'
  Ti.Contacts.showContacts
    animated: true
    selectedPerson: setContact
    fields: ['phone']
    error: contactError


setContact = (contact) ->
  Ti.API.info contact
  Ti.API.info contact.person
  # for own key, email of contact.person.email
  #   Ti.API.info email.toString()
  # Ti.API.info contact.person.phone.mobile.toString()

  emails = []
  phones = []
  for own key, email of contact.person.email
    emails.push email.toString()

  for own key, phone of contact.person.phone
    helper = require 'helper'
    phones.push helper.normalizePhone phone.toString()

  ConnectedContact = require 'connectedContact'
  name = contact.person.firstName
  name = contact.person.fullName.split(' ')[0] unless name?
  ConnectedContact.findOrCreate
    name:   name
    phones: phones
    emails: emails

  Parse.Cloud.run 'connectUsers', null,
    success: (res) ->
      Ti.API.info 'Parse code successfully ran'
    error: (err) ->
      Ti.API.info 'it did not work'
      Ti.API.info err

  if OS_IOS
    Ti.App.Properties.setString('contactRecordId', contact.person.recordId)
    completeSetup()
  else if OS_ANDROID
    Ti.App.Properties.setString('contactRecordId', contact.person.id)
    completeSetup()

contactError = (error) ->
  Ti.API.info 'There was an error selecting a contact'

addressBookDisallowed = () ->
  Ti.API.info 'bad stuff'

completeSetup = ->
  Ti.App.Properties.setBool('setupComplete', true)
  index = Alloy.createController('index').getView()
  index.open()

  setupView = $.chooseContact.getParent().getParent()
  setupView.close()

init = ->
  time = Ti.App.Properties.getString('departureTime')
  $.message.text = $.message.text.replace("{tk}", time)

init()
