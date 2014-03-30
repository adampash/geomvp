args = arguments[0] || {}

launchNextStep = ->
  scrollableView = $.welcome.getParent()
  scrollableView.scrollToView scrollableView.currentPage + 1
