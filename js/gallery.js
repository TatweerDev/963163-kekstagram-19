'use strict';

(function () {
  var pictureUserTemplate = document.querySelector('.pictures');
  var randomPictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  // Создает структуру DOM элементов
  var renderFoto = function (photo) {
    var userElement = randomPictureTemplate.cloneNode(true);
    userElement.querySelector('.picture__img').src = photo.url;
    userElement.querySelector('.picture__likes').textContent = photo.likes;
    userElement.querySelector('.picture__comments').textContent = photo.comments.length;
    userElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.renderPicrures.renderPhotoPopup(photo);
      window.events.showBigPicture();
    });
    return userElement;
  };

  // Создает фрагмент из массива элементов
  var makeFragment = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (element) {
      fragment.appendChild(renderFoto(element));
    });
    return fragment;
  };
  // Вставляет сгенерированный массив в разметку
  var showPhotos = function (userPictures) {
    pictureUserTemplate.appendChild(makeFragment(userPictures));
  };

  window.backend.getData(window.backend.GET_URL, showPhotos, window.utils.errorHandler);
})();
