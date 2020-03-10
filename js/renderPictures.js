'use strict';

(function () {
  var pictureUserTemplate = document.querySelector('.pictures');
  var bigPictureTemplate = document.querySelector('.big-picture');
  var documentBody = document.querySelector('body');
  var randomPictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');


  // Создаем структуру DOM элементов
  var renderFoto = function (photo) {
    var userElement = randomPictureTemplate.cloneNode(true);
    userElement.querySelector('.picture__img').src = photo.url;
    userElement.querySelector('.picture__likes').textContent = photo.likes;
    userElement.querySelector('.picture__comments').textContent = photo.comments.length;
    userElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      renderPhotoPopup(photo);
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
  var showPhotos = function () {
    var userPictures = window.data.generateData();
    pictureUserTemplate.appendChild(makeFragment(userPictures));
  };

  // Функция, создающая  DOM элементы из массива

  var renderPhotoPopup = function (post) {
    var fragment = document.createDocumentFragment();
    var commentsWrapper = bigPictureTemplate.querySelector('.social__comments');
    var commentTemplate = bigPictureTemplate.querySelector('.social__comment');
    bigPictureTemplate.querySelector('.big-picture__img img').src = post.url;
    bigPictureTemplate.querySelector('.likes-count').textContent = post.likes;
    bigPictureTemplate.querySelector('.comments-count').textContent = post.comments.length;
    post.comments.forEach(function (comment) {
      var template = commentTemplate.cloneNode(true);
      template.querySelector('.social__picture').src = comment.avatar;
      template.querySelector('.social__picture').alt = comment.name;
      template.querySelector('.social__text').textContent = comment.message;
      fragment.appendChild(template);
    });
    bigPictureTemplate.querySelector('.social__caption').textContent = post.description;
    commentsWrapper.appendChild(fragment);
  };

  // Скрывает блоки счетчика комментариев и загрузки новых комментариев.
  var addClassToElement = function (element, className) {
    element.classList.add(className);
  };
  var hideElements = function () {
    var commentsCounter = document.querySelector('.social__comment-count');
    var commentsLoader = document.querySelector('.comments-loader');
    addClassToElement(commentsCounter, 'hidden');
    addClassToElement(commentsLoader, 'hidden');
    addClassToElement(documentBody, 'modal-open');
  };

  window.renderPicrures = {
    addClassToElement: addClassToElement,
    hideElements: hideElements
  };

  showPhotos();
})();
