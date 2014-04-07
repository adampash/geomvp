cancel = ->
  $.feedbackForm.blur()
  $.feedback.close()

sendFeedback = ->
  feedbackText = $.feedbackForm.value
  if feedbackText is ""
    $.feedbackForm.focus()

  else
    Feedback = Parse.Object.extend "Feedback"
    feedback = new Feedback()
    feedback.set "text", feedbackText
    feedback.set "parent", Parse.User.current()

    feedback.save().then (response) ->
      $.feedback.close()
      setTimeout ->
        Ti.UI.createAlertDialog({
          message: 'Thanks so much for taking the time.'
          ok: 'OK'
          title: 'Feedback received!'
        }).show()
        $.feedbackForm.value = ''
        $.feedbackForm.blur()
      , 500
    , (response) ->
      Ti.UI.createAlertDialog({
        message: 'Sorry, we had trouble saving your feedback.'
        ok: 'OK'
        title: 'Feedback failed'
      }).show()

$.feedback.addEventListener 'open', (e) ->
  $.feedbackForm.focus()
