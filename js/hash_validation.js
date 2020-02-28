'use strict';

var HASH_ARRAY_MAX_LENGTH = 5;
//var LEGAL_CHAR = /[a-z0-9а-я#]/;

// Зададим функцию, записывающую массив из Хэш-тегов 
var hashTagInput = document.querySelector('.text__hashtags');
hashTagInput.addEventListener('input', function () {
  var hashArray = hashTagInput.value.toLowerCase().split(' ');
  // Ограничим количество хэш-тегов до 5
  if (hashArray.length > HASH_ARRAY_MAX_LENGTH) {  
    hashTagInput.setCustomValidity('Нельзя указывать более 5 хештегов');
    hashTagInput.reportValidity();
    return false;
  }
  // Добавим проверку на использование двух одинакововых хэш-тегов
  if (hashArray.length >= 2) {
    var noLastHashArray =  hashArray.slice(0,hashArray.length-1);    
    if (noLastHashArray.includes(hashArray[hashArray.length-1])) {
      hashTagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      hashTagInput.reportValidity();
      return false;
    }
  }
  // Сделаем хеш-тег необязательным при заполнении формы
  if (hashArray[0] !== '') {
    checkHashTagValidity(hashArray);
  }
});
// Зададим функции проверки Хэш-тегов на валидность
var checkHashTagValidity = function (array) {
  var errorMessage = '';
  array.forEach(function (hashTag) {
  if (hashTag[0] !== '#') {
    errorMessage = 'Первым элементом хэштега должен быть символ "#"';
  }
  if (hashTag.length <= 1) {
    errorMessage = 'Хеш-тег не может быть только символом #';
  }
  if (hashTag.length >= 20) {
    errorMessage = 'Хеш-тег не может быть более 20 символов';
  }
  if (hashTag.include) {}
  hashTagInput.setCustomValidity(errorMessage);  
  });  
};
