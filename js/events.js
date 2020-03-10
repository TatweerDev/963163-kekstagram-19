'use strict';

(function () {
  var photosUploadButton = document.querySelector('#upload-file');
  var documentBody = document.querySelector('body');
  var photosRedactForm = document.querySelector('.img-upload__overlay');
  var bigPictureTemplate = document.querySelector('.big-picture');
  var bigPictureCancel = bigPictureTemplate.querySelector('#picture-cancel');
  var effectPinBar = document.querySelector('.img-upload__effect-level');
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePhotoRedactForm);
  };

  var onBigPhotoEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeBigPicture);
  };

  // Показ формы редактировния фото

  var showEditForm = function () {
    removeClassFromElement(photosRedactForm, 'hidden');
    window.renderPicrures.addClassToElement(documentBody, 'modal-open');
    window.utils.toggleElementClass(effectPinBar, 'hidden', true);
    document.addEventListener('keydown', onPopupEscPress);
  };

  photosUploadButton.addEventListener('change', function () {
    showEditForm();
  });

  // Cобытие скрытия формы редактирования изображения при клике на крестик

  var formCloseButton = photosRedactForm.querySelector('#upload-cancel');
  var closePhotoRedactForm = function () {
    window.renderPicrures.addClassToElement(photosRedactForm, 'hidden');
    removeClassFromElement(documentBody, 'modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  formCloseButton.addEventListener('click', function () {
    closePhotoRedactForm();
  });

  // Функция удаляющая класс из элемента и применим ее к показу фото
  var removeClassFromElement = function (element, className) {
    element.classList.remove(className);
  };

  // Показ фото ползователя Fullscreen

  var showBigPicture = function () {
    removeClassFromElement(bigPictureTemplate, 'hidden');
    document.addEventListener('keydown', onBigPhotoEscPress);
  };

  var closeBigPicture = function () {
    window.renderPicrures.addClassToElement(bigPictureTemplate, 'hidden');
    removeClassFromElement(documentBody, 'modal-open');
    document.removeEventListener('keydown', onBigPhotoEscPress);
  };
  bigPictureCancel.addEventListener('click', function () {
    closeBigPicture();
  });

  window.events = {
    showBigPicture: showBigPicture
  };

})();
