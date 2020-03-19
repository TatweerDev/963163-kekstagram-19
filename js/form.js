'use strict';

(function () {
  // Cобытие при захвате бегунка настройки глубины эффекта
  var EFFECTS_PREVIEW = {
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
  var effectPinBar = document.querySelector('.img-upload__effect-level');
  var inputLevelValue = document.querySelector('.effect-level__value');
  var photosForm = document.querySelector('.img-upload__form');
  var photosRedactForm = document.querySelector('.img-upload__overlay');
  var documentBody = document.querySelector('body');
  var photosUploadButton = document.querySelector('#upload-file');

  // Показ формы редактировния фото

  var showEditForm = function () {
    resetImageEffect();
    window.utils.removeClassFromElement(photosRedactForm, 'hidden');
    window.utils.addClassToElement(documentBody, 'modal-open');
    window.utils.toggleElementClass(effectPinBar, 'hidden', true);
    document.addEventListener('keydown', onPopupEscPress);
  };

  photosUploadButton.addEventListener('change', function () {
    showEditForm();
  });

  // Фунуция обработчика события ползунка глубины эффекта
  effectLevelPin.addEventListener('mousedown', function (evt) {
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
    resetImageEffect();
    imagePreview.className = 'effects__preview--' + evt.target.value;
    window.utils.toggleElementClass(effectPinBar, 'hidden', evt.target.value === 'none');
    applyImageEffect();
  });

  // Функция изменения глубины эффекта
  var applyImageEffect = function () {
    var currentImageEffect = imagePreview.getAttribute('class');
    switch (currentImageEffect) {
      case EFFECTS_PREVIEW.CHROME:
        imagePreview.style.filter = 'grayscale(' + inputEffectLevel.value / 100 + ')';
        break;
      case EFFECTS_PREVIEW.SEPIA:
        imagePreview.style.filter = 'sepia(' + inputEffectLevel.value / 100 + ')';
        break;
      case EFFECTS_PREVIEW.MARVIN:
        imagePreview.style.filter = 'invert(' + inputEffectLevel.value + '%)';
        break;
      case EFFECTS_PREVIEW.PHOBOS:
        imagePreview.style.filter = 'blur(' + inputEffectLevel.value / 33 + 'px)';
        break;
      case EFFECTS_PREVIEW.HEAT:
        var getBrightness = function () {
          var minValue = 1;
          var maxValue = 3;
          return (inputEffectLevel.value * (maxValue - minValue) / 100) + minValue;
        };
        imagePreview.style.filter = 'brightness(' + getBrightness() + ')';
        break;
      default:
        imagePreview.style.filter = 'none';
        break;
    }
  };

  // Функция сброса позиции бегунка при смене эффекта
  var resetImageEffect = function () {
    imagePreview.className = '';
    imagePreview.style = '';
    inputEffectLevel.value = 100;
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  };

  // Cобытие скрытия формы редактирования изображения при клике на крестик

  var formCloseButton = photosRedactForm.querySelector('#upload-cancel');
  var closePhotoRedactForm = function () {
    window.utils.addClassToElement(photosRedactForm, 'hidden');
    window.utils.removeClassFromElement(documentBody, 'modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePhotoRedactForm);
  };

  formCloseButton.addEventListener('click', function () {
    closePhotoRedactForm();
  });

  // Отправка данных формы загрузки фото на сервер
  var onSuccess = function () {
    closePhotoRedactForm();
    window.modal.showSuccessPopup();
  };
  var onFail = function () {
    closePhotoRedactForm();
    window.modal.showErrorPopup();
  };
  photosForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.postData(window.backend.POST_URL, onSuccess, onFail, new FormData(photosForm));
  });

})();
