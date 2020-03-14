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

  // Функция сброса настроек эффекта ппи выборе эффекта original
  var toggleElementClass = function (element, className, force) {
    element.classList.toggle(className, force);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Функция удаляющая класс из элемента
  var removeClassFromElement = function (element, className) {
    element.classList.remove(className);
  };

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomMinMaxIndex: getRandomMinMaxIndex,
    getRandomIndex: getRandomIndex,
    toggleElementClass: toggleElementClass,
    errorHandler: errorHandler,
    removeClassFromElement: removeClassFromElement
  };

})();
