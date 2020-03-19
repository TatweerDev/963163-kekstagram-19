'use strict';

(function () {
  var pictureUserTemplate = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseBtn = bigPicture.querySelector('#picture-cancel');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // Отрисовывает страничку полноэекранного фото
  var renderPhotoPopup = function (post) {
    bigPicture.querySelector('.big-picture__img img').src = post.url;
    bigPicture.querySelector('.likes-count').textContent = post.likes;
    bigPicture.querySelector('.social__caption').textContent = post.description;
    window.comments.init(post.comments);
  };

  var onBigPhotoEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeBigPicture);
  };

  var onBigPictureCloseBtnClick = function () {
    closeBigPicture();
  };

  var showBigPicture = function (post) {
    renderPhotoPopup(post);
    bigPicture.classList.remove('hidden');
    window.utils.addModalOpenClass();
    document.addEventListener('keydown', onBigPhotoEscPress);
    bigPictureCloseBtn.addEventListener('click', onBigPictureCloseBtnClick);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    window.utils.removeModalOpenClass();
    document.removeEventListener('keydown', onBigPhotoEscPress);
    bigPictureCloseBtn.removeEventListener('click', onBigPictureCloseBtnClick);
  };

  // Создает структуру DOM элементов
  var renderPhoto = function (photo) {
    var postItem = pictureTemplate.cloneNode(true);
    postItem.querySelector('.picture__img').src = photo.url;
    postItem.querySelector('.picture__likes').textContent = photo.likes;
    postItem.querySelector('.picture__comments').textContent = photo.comments.length;
    postItem.addEventListener('click', function (evt) {
      evt.preventDefault();
      showBigPicture(photo);
    });
    return postItem;
  };

  // Создает фрагмент из массива элементов
  var makeFragment = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (element) {
      fragment.appendChild(renderPhoto(element));
    });
    return fragment;
  };
  var renderPosts = function (userPictures) {
    pictureUserTemplate.appendChild(makeFragment(userPictures));
  };
  // Вставляет сгенерированный массив в разметку и показывает меню фильтров изображений
  var showPhotos = function (userPictures) {
    renderPosts(userPictures);
    window.filter.activate(userPictures);
  };

  var onSubmitSuccessHandle = function (data) {
    showPhotos(data);
  };

  window.gallery = {
    showPhotos: showPhotos,
    renderPosts: renderPosts
  };

  window.backend.getData(window.backend.GET_URL, onSubmitSuccessHandle, window.utils.onSubmitErrorHandle);
})();
