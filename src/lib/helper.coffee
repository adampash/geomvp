helper =
  normalizePhone: (num) ->
    num.replace(/[\(\)-\s]/g, '')


  findById: (view, id) ->
    for obj in view.children
      if obj.id == id
          return obj

  getContactName: ->
    recordId = Ti.App.Properties.getString('contactRecordId')
    contact = @getContact recordId
    contact.firstName || contact.fullName.split(" ")[0]

  getContact: (recordId) ->
    contact = Ti.Contacts.getPersonByID parseInt(recordId)
    contact



module.exports = helper
