PagingControl =
  create: (numViews) ->
    Ti.API.info 'create a control for ' + numViews + ' pages'
    views = []
    # colors = ['red', 'green', 'blue', 'yellow', 'gray']
    colors = []
    size = 100/numViews

    for num in [0...numViews]
      view = Ti.UI.createView(
        opacity: 0.1
        width: size + "%"
        height: "10dp"
        backgroundColor: colors[num] || 'gray'
      )
      views.push view

    views[0].setOpacity(1.0)
    views

module.exports = PagingControl
