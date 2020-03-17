'use strict';

(function () {

  var documentBody = document.querySelector('body');
  var bigPictureTemplate = document.querySelector('.big-picture');
  var bigPictureCancel = bigPictureTemplate.querySelector('#picture-cancel');

  var onBigPhotoEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeBigPicture);
  };

  // Показ фото ползователя Fullscreen

  var showBigPicture = function () {
    window.utils.removeClassFromElement(bigPictureTemplate, 'hidden');
    document.addEventListener('keydown', onBigPhotoEscPress);
    window.utils.addClassToElement(documentBody, 'modal-open');
  };

  var closeBigPicture = function () {
    window.utils.addClassToElement(bigPictureTemplate, 'hidden');
    window.utils.removeClassFromElement(documentBody, 'modal-open');
    document.removeEventListener('keydown', onBigPhotoEscPress);
  };
  bigPictureCancel.addEventListener('click', function () {
    closeBigPicture();
  });

  window.events = {
    showBigPicture: showBigPicture
  };

})();
