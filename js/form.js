'use strict';

(function () {
  // Cобытие при захвате бегунка настройки глубины эффекта
  var Effects_Preview = {
    NONE: 'effects__preview--none',
    CHROME: 'effects__preview--chrome',
    SEPIA: 'effects__preview--sepia',
    MARVIN: 'effects__preview--marvin',
    PHOBOS: 'effects__preview--phobos',
    HEAT: 'effects__preview--heat'
  };
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectsList = document.querySelector('.effects__list');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var inputEffectLevel = document.querySelector('input[name=effect-level]');

  // Фунуция обработчика события ползунка глубины эффекта
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    }

    var onMouseMove = function (moveEvt) {      

      var shift = {
        x: startCoords.x - moveEvt.clientX     
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var movePosition = effectLevelPin.offsetLeft - shift.x;
      var minMovePosition = 0;
      var maxMovePosition = effectLevelLine.offsetWidth;
      
      if (movePosition >= minMovePosition && movePosition <= maxMovePosition) {
        effectLevelPin.style.left = (movePosition) + 'px';
        effectLevelDepth.style.width = effectLevelPin.style.left;
      };

     // Настройка глубины эффекта
      inputEffectLevel.value = Math.floor(effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth * 100);    
      applyImageEffect()
      };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Функция изменеия класса (типа) эффекта
  effectsList.addEventListener('change', function (evt) {
    imagePreview.className = 'effects__preview--' + evt.target.value;
    applyImageEffect()     
  });

  // Функция изменения глубины эффекта
  var applyImageEffect = function () {
    var currentImageEffect = imagePreview.getAttribute('class');
    switch (currentImageEffect) {
      case Effects_Preview.CHROME:
        imagePreview.style.filter = 'grayscale(' + inputEffectLevel.value / 100 + ')';
        break
      case Effects_Preview.SEPIA:
        imagePreview.style.filter = 'sepia(' + inputEffectLevel.value / 100 + ')';
        break
      case Effects_Preview.MARVIN:
        imagePreview.style.filter = 'invert(' + inputEffectLevel.value + '%)';
        break
      case Effects_Preview.PHOBOS:
        imagePreview.style.filter = 'blur(' + inputEffectLevel.value/33 + 'px)';
        break
      case Effects_Preview.HEAT:
        imagePreview.style.filter = 'brightness(' + inputEffectLevel.value/33 + ')';
        break
      case Effects_Preview.NONE:
        imagePreview.style.filter = 'none';
        break
    }      
  };
})();
