'use strict';

(function () {
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

  var shuffleArray = function (array) {
    var clonedArray = array.slice();
    for (var i = clonedArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = clonedArray[i];
      clonedArray[i] = clonedArray[j];
      clonedArray[j] = temp;
    }
    return clonedArray;
  };

  // Функция сброса настроек эффекта при переключении эффекта original
  var toggleElementClass = function (element, className, force) {
    element.classList.toggle(className, force);
  };

  var addModalOpenClass = function () {
    document.body.classList.add('modal-open');
  };

  var removeModalOpenClass = function () {
    document.body.classList.remove('modal-open');
  };

  var onSubmitErrorHandle = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomMinMaxIndex: getRandomMinMaxIndex,
    getRandomIndex: getRandomIndex,
    toggleElementClass: toggleElementClass,
    onSubmitErrorHandle: onSubmitErrorHandle,
    shuffleArray: shuffleArray,
    addModalOpenClass: addModalOpenClass,
    removeModalOpenClass: removeModalOpenClass
  };

})();
