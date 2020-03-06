'use strict';

(function (){
  var KEY_CODE = {
      ESCAPE: 27,
      ENTER: 13
  };
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KEY_CODE.ESCAPE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      action();
    }
  };

  var getRandomMinMaxIndex = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var getRandomIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };
  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomMinMaxIndex: getRandomMinMaxIndex,
    getRandomIndex: getRandomIndex
  };

})();