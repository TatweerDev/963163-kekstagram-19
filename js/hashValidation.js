'use strict';

(function () {
  var HASH_ARRAY_MAX_LENGTH = 5;
  var MAX_SYMBOLS_IN_HASH = 20;
  var HASHTAG_PATTERN = /^#[a-zA-Zа-яА-Я0-9]+$/;
  var INPUT_ERROR_STYLE = '3px solid red';
  var hashTagInput = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');

  var getHashtagErrorMessage = function (hashTag, hashTagsArr) {
    if (hashTag.charAt(0) !== '#') {
      return 'Первым элементом хэштега должен быть символ "#"';
    }
    if (hashTag.length === 1) {
      return 'Хеш-тег не может быть только символом #';
    }
    if (hashTag.length > MAX_SYMBOLS_IN_HASH) {
      return 'Хеш-тег не может быть более 20 символов';
    }
    if (hashTagsArr.length > HASH_ARRAY_MAX_LENGTH) {
      return 'Максимально количество хэш-тегов 5';
    }
    if (hashTagsArr.indexOf(hashTag) !== hashTagsArr.lastIndexOf(hashTag)) {
      return 'Не должно быть двух одинаковых хэш-тегов';
    }
    if (!HASHTAG_PATTERN.test(hashTag)) {
      return 'Хэш-тег не должен содержать спецсимволов, таких как: "!@#$%^&" и т.д.';
    }
    return '';
  };

  var checkHashtags = function () {
    var hashArray = hashTagInput.value.toLowerCase().split(' ').filter(function (hash) {
      if (hash !== ' ') {
        return hash;
      }
      return false;
    });
    var errorMessage = '';
    for (var i = 0; i < hashArray.length; i++) {
      errorMessage = getHashtagErrorMessage(hashArray[i], hashArray);
      if (errorMessage) {
        hashTagInput.style.border = INPUT_ERROR_STYLE;
        break;
      } else {
        hashTagInput.style.border = '';
      }
    }
    hashTagInput.setCustomValidity(errorMessage);
  };

  var removeOnFocus = function () {
    document.removeEventListener('keydown', window.form.onPopupEscPress);
  };

  var addOnBlur = function () {
    document.addEventListener('keydown', window.form.onPopupEscPress);
  };

  var onHashTagInputFocus = function () {
    removeOnFocus();
  };

  var onHashTagInputBlur = function () {
    addOnBlur();
  };

  var onTextDescriptionFocus = function () {
    removeOnFocus();
  };

  var onTextDescriptionBlur = function () {
    addOnBlur();
  };

  var activate = function () {
    hashTagInput.addEventListener('input', checkHashtags);

    hashTagInput.addEventListener('focus', onHashTagInputFocus);
    hashTagInput.addEventListener('blur', onHashTagInputBlur);

    textDescription.addEventListener('focus', onTextDescriptionFocus);
    textDescription.addEventListener('blur', onTextDescriptionBlur);
  };

  var deactivate = function () {
    hashTagInput.removeEventListener('input', checkHashtags);

    hashTagInput.removeEventListener('focus', onHashTagInputFocus);
    hashTagInput.removeEventListener('blur', onHashTagInputBlur);

    textDescription.removeEventListener('focus', onTextDescriptionFocus);
    textDescription.removeEventListener('blur', onTextDescriptionBlur);
  };

  window.hashValidation = {
    activate: activate,
    deactivate: deactivate
  };

})();
