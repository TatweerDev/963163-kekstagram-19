'use strict';

(function () {
  var pictureUserTemplate = document.querySelector('.pictures');
  var imageFilters = document.querySelector('.img-filters');
  var randomPictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  // Создает структуру DOM элементов
  var renderPhoto = function (photo) {
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
      fragment.appendChild(renderPhoto(element));
    });
    return fragment;
  };
  // Вставляет сгенерированный массив в разметку и показывает меню фильтров изображений
  var showPhotos = function (userPictures) {
    pictureUserTemplate.appendChild(makeFragment(userPictures));
    window.utils.removeClassFromElement(imageFilters, 'img-filters--inactive');
    window.filter.imgFilter(userPictures);
  };

  window.gallery = {
    showPhotos: showPhotos
  };

  window.backend.getData(window.backend.GET_URL, showPhotos, window.utils.errorHandler);
})();
