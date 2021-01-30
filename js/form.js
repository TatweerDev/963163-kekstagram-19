'use strict';

(function () {
  // Cобытие при захвате бегунка настройки глубины эффекта
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var formCloseButton = imgUploadOverlay.querySelector('#upload-cancel');

  var clearForm = function () {
    imgUploadForm.reset();
  };


  // Показ формы редактировния фото
  var showEditForm = function () {
    window.effect.activate();
    window.zoom.activate();
    imgUploadOverlay.classList.remove('hidden');
    window.utils.addModalOpenClass();
    document.addEventListener('keydown', onPopupEscPress);
    window.hashValidation.activate();
  };

  var hideEditForm = function () {
    clearForm();
    imgUploadOverlay.classList.add('hidden');
    window.utils.removeModalOpenClass();
    window.zoom.deactivate();
    window.effect.deactivate();
    window.hashValidation.deactivate();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Cобытие скрытия формы редактирования изображения при клике на крестик
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, hideEditForm);
  };

  formCloseButton.addEventListener('click', function () {
    hideEditForm();
  });

  // Отправка данных формы загрузки фото на сервер
  var onSubmitSuccessHandle = function () {
    hideEditForm();
    window.modal.showSuccessPopup();
  };
  var onSubmitErrorHandle = function () {
    hideEditForm();
    window.modal.showErrorPopup();
  };

  var onImgUploadFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.serverRequest('POST', window.backend.POST_URL, onSubmitSuccessHandle, onSubmitErrorHandle, new FormData(imgUploadForm));
  };

  imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);

  window.form = {
    showEditForm: showEditForm,
    onPopupEscPress: onPopupEscPress
  };

})();
