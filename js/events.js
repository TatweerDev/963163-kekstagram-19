'use strict';

(function (){
  var photosUploadButton = document.querySelector('#upload-file');
  var documentBody = document.querySelector('body');
  var photosRedactForm =  document.querySelector('.img-upload__overlay');
  var bigPictureTemplate = document.querySelector('.big-picture');
  var bigPictureCancel = bigPictureTemplate.querySelector('#picture-cancel');
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePhotoRedactForm);
  };

  var onBigPhotoEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeBigPicture);
  };

  // Показ формы редактировния фото

  var showRedactForm = function () {
    removeClassFromElement(photosRedactForm, 'hidden');
    window.clone2dom.addClassToElement(documentBody, 'modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  }

  photosUploadButton.addEventListener('change', function () {   
    showRedactForm();
  });   
  
  // Cобытие скрытия формы редактирования изображения при клике на крестик

  var formCloseButton = photosRedactForm.querySelector('#upload-cancel');
  var closePhotoRedactForm = function () {
    window.clone2dom.addClassToElement(photosRedactForm, 'hidden');
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
  
  var closeBigPicture =  function () {
    window.clone2dom.addClassToElement(bigPictureTemplate,'hidden');
    removeClassFromElement(documentBody, 'modal-open');
  };
  bigPictureCancel.addEventListener('click', function () {
  closeBigPicture();
  });

  window.events = {
    showBigPicture: showBigPicture
  }
 
})();