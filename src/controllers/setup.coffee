args = arguments[0] || {}

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

$.setup.addEventListener 'scroll', (e) ->
  currentPageAsFloat = e.currentPageAsFloat
  currentPage = Math.floor e.currentPageAsFloat
  views = $.pagingControl.children
  opacity = currentPageAsFloat - currentPage
  opacity = 0.1 if opacity < 0.1
  views[currentPage].setOpacity(opacity)

