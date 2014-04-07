var cancel, sendFeedback;

cancel = function() {
  $.feedbackForm.blur();
  return $.feedback.close();
};

sendFeedback = function() {
  var Feedback, feedback, feedbackText;
  feedbackText = $.feedbackForm.value;
  if (feedbackText === "") {
    return $.feedbackForm.focus();
  } else {
    Feedback = Parse.Object.extend("Feedback");
    feedback = new Feedback();
    feedback.set("text", feedbackText);
    feedback.set("parent", Parse.User.current());
    return feedback.save().then(function(response) {
      $.feedback.close();
      return setTimeout(function() {
        Ti.UI.createAlertDialog({
          message: 'Thanks so much for taking the time.',
          ok: 'OK',
          title: 'Feedback received!'
        }).show();
        $.feedbackForm.value = '';
        return $.feedbackForm.blur();
      }, 500);
    }, function(response) {
      return Ti.UI.createAlertDialog({
        message: 'Sorry, we had trouble saving your feedback.',
        ok: 'OK',
        title: 'Feedback failed'
      }).show();
    });
  }
};

$.feedback.addEventListener('open', function(e) {
  return $.feedbackForm.focus();
});

//# sourceMappingURL=feedback.js.map
