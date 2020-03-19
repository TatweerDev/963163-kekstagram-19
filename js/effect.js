'use strict';

(function () {
  var EFFECTS_PREVIEW = {
    NONE: 'effects__preview--none',
    CHROME: 'effects__preview--chrome',
    SEPIA: 'effects__preview--sepia',
    MARVIN: 'effects__preview--marvin',
    PHOBOS: 'effects__preview--phobos',
    HEAT: 'effects__preview--heat'
  };

  var DEFAULT_EFFECT_LEVEL = 100;
  var effectPinBar = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectsList = document.querySelector('.effects__list');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var inputEffectLevel = document.querySelector('input[name=effect-level]');
  var inputLevelValue = document.querySelector('.effect-level__value');


  // Функция сброса позиции бегунка при смене эффекта
  var resetImageEffect = function () {
    imagePreview.className = '';
    imagePreview.style = '';
    inputEffectLevel.value = DEFAULT_EFFECT_LEVEL;
    effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + '%';
    effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + '%';
  };

  var onEffectLevelPinMousedown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };

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
      }

      // Настройка глубины эффекта
      inputEffectLevel.value = Math.floor(effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth * 100);
      inputEffectLevel.value = inputLevelValue.value;
      applyImageEffect();
    };

    var onMouseUp = function () {
      evt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onEffectsListChange = function (evt) {
    resetImageEffect();
    imagePreview.className = 'effects__preview--' + evt.target.value;
    window.utils.toggleElementClass(effectPinBar, 'hidden', evt.target.value === 'none');
    applyImageEffect();
  };

  var getBrightness = function () {
    var minValue = 1;
    var maxValue = 3;
    return (inputEffectLevel.value * (maxValue - minValue) / 100) + minValue;
  };

  // Функция изменения глубины эффекта
  var applyImageEffect = function () {
    var currentImageEffect = imagePreview.getAttribute('class');
    switch (currentImageEffect) {
      case EFFECTS_PREVIEW.CHROME: {
        imagePreview.style.filter = 'grayscale(' + inputEffectLevel.value / 100 + ')';
        break;
      }
      case EFFECTS_PREVIEW.SEPIA: {
        imagePreview.style.filter = 'sepia(' + inputEffectLevel.value / 100 + ')';
        break;
      }
      case EFFECTS_PREVIEW.MARVIN: {
        imagePreview.style.filter = 'invert(' + inputEffectLevel.value + '%)';
        break;
      }
      case EFFECTS_PREVIEW.PHOBOS: {
        imagePreview.style.filter = 'blur(' + 3 / 100 * inputEffectLevel.value + 'px)';
        break;
      }
      case EFFECTS_PREVIEW.HEAT: {
        imagePreview.style.filter = 'brightness(' + getBrightness() + ')';
        break;
      }
      default: {
        imagePreview.style.filter = 'none';
        break;
      }
    }
  };

  var activate = function () {
    effectPinBar.classList.add('hidden');
    // Фунуция обработчика события ползунка глубины эффекта
    effectLevelPin.addEventListener('mousedown', onEffectLevelPinMousedown);
    // Функция изменеия класса (типа) эффекта
    effectsList.addEventListener('change', onEffectsListChange);
    resetImageEffect();
  };

  var deactivate = function () {
    // Фунуция обработчика события ползунка глубины эффекта
    effectLevelPin.removeEventListener('mousedown', onEffectLevelPinMousedown);
    // Функция изменеия класса (типа) эффекта
    effectsList.removeEventListener('change', onEffectsListChange);
  };

  window.effect = {
    activate: activate,
    deactivate: deactivate,
  };

})();
