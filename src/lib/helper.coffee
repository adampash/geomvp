helper =
  normalizePhone: (num) ->
    num.replace(/[\(\)-\s]/g, '')

module.exports = helper
