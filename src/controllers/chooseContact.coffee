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
  for own key, email of contact.person.email
    Ti.API.info email.toString()
  Ti.API.info contact.person.phone.mobile.toString()
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
