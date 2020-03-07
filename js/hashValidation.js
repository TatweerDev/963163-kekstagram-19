'use strict';

(function () {
  var HASH_ARRAY_MAX_LENGTH = 5;
  var MAX_SYMBOLS_IN_HASH = 20;
  var hashTagInput = document.querySelector('.text__hashtags');
  var HASHTAG_PATTERN = /^#[a-zA-Zа-яА-Я0-9]+$/;

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
        break;
      }
    }
    hashTagInput.setCustomValidity(errorMessage);
  };

  hashTagInput.addEventListener('input', checkHashtags);

})();
