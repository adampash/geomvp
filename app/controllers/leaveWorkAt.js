var args, getUTCTime, init, launchNextStep, saveTime, setPicker, setTime, time, timeToString;

args = arguments[0] || {};

time = {};

saveTime = function() {
  var LeaveWindow;
  Ti.App.Properties.setString('departureTime', timeToString());
  LeaveWindow = require('leaveWindow');
  LeaveWindow.findOrCreate({
    humanTime: timeToString(),
    utcTime: getUTCTime()
  });
  return launchNextStep();
};

launchNextStep = function() {
  var scrollableView;
  scrollableView = $.leaveWorkAt.getParent();
  return scrollableView.scrollToView(scrollableView.currentPage + 1);
};

timeToString = function() {
  return '' + time.hour + ':' + time.minute + ' ' + time.meridian;
};

getUTCTime = function() {
  var date, hour;
  if (time.meridian === 'pm') {
    hour = parseInt(time.hour) + 12;
  } else {
    hour = parseInt(time.hour);
  }
  date = new Date();
  date.setHours(hour);
  date.setMinutes(parseInt(time.minute));
  return {
    hour: date.getUTCHours(),
    minute: date.getMinutes()
  };
};

setTime = function(event) {
  return time = {
    hour: event.selectedValue[0],
    minute: event.selectedValue[1],
    meridian: event.selectedValue[2]
  };
};

setPicker = function() {
  $.picker.setSelectedRow(0, setRows.hour, true);
  $.picker.setSelectedRow(1, setRows.minute, true);
  return $.picker.setSelectedRow(2, setRows.meridian, true);
};

init = function() {
  var hour, meridian, minute, setRows;
  setRows = {
    'hour': 5,
    'minute': 0,
    'meridian': 1
  };
  if (Ti.App.Properties.getString('departureTime')) {
    time = Ti.App.Properties.getString('departureTime');
    hour = parseInt(time.split(':')[0]);
    minute = parseInt(time.split(':')[1].split(' ')[0]);
    meridian = time.split(' ')[1];
    setRows.hour = hour - 1;
    setRows.minute = minute / 15;
    if (meridian === 'am') {
      setRows.meridian = 0;
    } else {
      setRows.meridian = 1;
    }
  }
  return setTimeout(function() {
    Ti.API.info('setting picker');
    Ti.API.info($.picker);
    Ti.API.info(setRows);
    $.picker.setSelectedRow(0, setRows.hour, true);
    $.picker.setSelectedRow(1, setRows.minute, true);
    return $.picker.setSelectedRow(2, setRows.meridian, true);
  }, 1000);
};

$.leaveWorkAt.addEventListener('postlayout', function(e) {
  return init();
});

//# sourceMappingURL=leaveWorkAt.js.map
