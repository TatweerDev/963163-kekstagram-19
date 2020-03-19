'use strict';

(function () {

  var bigPictureTemplate = document.querySelector('.big-picture');
  var documentBody = document.querySelector('body');

  // Отрисовывает страничку полноэекранного фото пользооавтеля

  var renderPhotoPopup = function (post) {
    window.comments.init(post.comments);
    bigPictureTemplate.querySelector('.big-picture__img img').src = post.url;
    bigPictureTemplate.querySelector('.likes-count').textContent = post.likes;
    bigPictureTemplate.querySelector('.social__caption').textContent = post.description;
  };

  // Скрывает блоки счетчика комментариев и загрузки новых комментариев.

  var hideElements = function () {
    var commentsCounter = document.querySelector('.social__comment-count');
    var commentsLoader = document.querySelector('.comments-loader');
    window.utils.addClassToElement(commentsCounter, 'hidden');
    window.utils.addClassToElement(commentsLoader, 'hidden');
    window.utils.addClassToElement(documentBody, 'modal-open');
  };

  window.renderPicrures = {
    renderPhotoPopup: renderPhotoPopup,
    hideElements: hideElements
  };
})();
