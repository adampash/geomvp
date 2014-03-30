PagingControl =
  create: (numViews) ->
    Ti.API.info 'create a control for ' + numViews + ' pages'
    views = []
    colors = ['red', 'green', 'blue', 'yellow', 'gray']

    size = 100/numViews

    for num in [0...numViews]
      view = Ti.UI.createView(
        opacity: 0.1
        width: size + "%"
        height: "10dp"
        backgroundColor: colors[num]
      )
      views.push view

    views

module.exports = PagingControl
