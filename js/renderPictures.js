'use strict';

(function () {

  var bigPictureTemplate = document.querySelector('.big-picture');
  var documentBody = document.querySelector('body');

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
