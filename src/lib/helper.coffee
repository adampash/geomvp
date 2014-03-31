helper =
  normalizePhone: (num) ->
    num.replace(/[\(\)-\s]/g, '')


  findById: (view, id) ->
    for obj in view.children
      if obj.id == id
          return obj

module.exports = helper
