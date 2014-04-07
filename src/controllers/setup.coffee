args = arguments[0] || {}

InstallProgress = require 'installProgress'

completeSetup = ->
  InstallProgress.findOrCreate
    greenLight: true
  index = Alloy.createController('index').getView()
  index.open()
  $.setup.close()

startOver = ->
  $.scrollableView.scrollToView 2

$.setup.addEventListener 'open', (e) ->
  numPages = $.scrollableView.getViews().length

  pager = require 'pager'
  pagerControl = pager.create(numPages)

  for control in pagerControl
    $.pagingControl.add(control)

$.setup.addEventListener 'scrollend', (e) ->
  if e.currentPage?
    currentPage = e.currentPage

    Ti.API.debug $.pagingControl.children[currentPage]
    $.pagingControl.children[currentPage].setOpacity(1.0)

    activeView = $.scrollableView.getViews()[currentPage]
    Ti.API.debug activeView.id

    if activeView.id is "login"
      Ti.API.info 'focus registration form'
      activeView.children[1].children[1].focus()

    if activeView.id is "setupWorkAddress"
      Ti.API.info 'focus work address'
      unless Ti.App.Properties.getObject('workLocation')?
        activeView.children[1].children[0].focus()

    if activeView.id is "chooseContact"
      helper = require 'helper'
      Ti.API.debug "Need to update text"
      Ti.API.debug activeView.children[0].children
      pushMessage = helper.findById activeView.children[0], 'pushMessage'
      message = helper.findById activeView.children[0], 'message'

      time = Ti.App.Properties.getString('departureTime')
      message.text = message.text.replace("{tk}", time)

      name = Parse.User.current().get("name").split(" ")[0]
      pushMessage.text = pushMessage.text.replace("{tk}", name)

    if activeView.id is "complete"
      helper = require 'helper'
      completeMessage = helper.findById activeView, 'completeMessage'

      contactName = helper.getContactName()

      completeMessage.text = completeMessage.text.replace(/\{tk\}/g, contactName)

    if Parse.User.current()
      params = {}
      params[activeView.id] = true
      InstallProgress.findOrCreate params


$.setup.addEventListener 'scroll', (e) ->
  currentPageAsFloat = e.currentPageAsFloat + 1
  currentPage = Math.floor e.currentPageAsFloat + 1
  if currentPage < $.pagingControl.children.length
    views = $.pagingControl.children
    opacity = currentPageAsFloat - currentPage
    # if opacity < 0.1
    #   opacity = 0.1
    # else
    #   views[currentPage].setBackgroundColor("blue")
    views[currentPage].setOpacity(opacity)
