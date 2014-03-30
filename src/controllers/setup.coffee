args = arguments[0] || {}


# setPicker = ->
#   $.picker.setSelectedRow 0, setRows.hour, true
#   $.picker.setSelectedRow 1, setRows.minute, true
#   $.picker.setSelectedRow 2, setRows.meridian, true

$.setup.addEventListener 'open', (e) ->
  numPages = $.scrollableView.getViews().length

  pager = require 'pager'
  pagerControl = pager.create(numPages)

  for control in pagerControl
    $.pagingControl.add(control)

$.setup.addEventListener 'scrollend', (e) ->
  if e.currentPage is 1
    Ti.API.info 'focus work address'

    setTimeout ->
      input = Alloy.createController('setupWorkAddress').getView('workAddress')
      Ti.API.debug input
      input.focus()
    , 300
  # if e.currentPage is 3
    # leaveWork = Alloy.createController('leaveWorkAt')
    # Ti.API.info "set picker"
    # Ti.API.info leaveWork.init()


$.setup.addEventListener 'scroll', (e) ->
  currentPageAsFloat = e.currentPageAsFloat
  currentPage = Math.floor e.currentPageAsFloat
  views = $.pagingControl.children
  opacity = currentPageAsFloat - currentPage
  opacity = 0.1 if opacity < 0.1
  views[currentPage].setOpacity(opacity)
