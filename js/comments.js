'use strict';

(function () {
  var COMMENTS_ADD_STEP = 5;
  var bigPictureTemplate = document.querySelector('.big-picture');
  var commentTemplate = bigPictureTemplate.querySelector('.social__comment');
  var commentsWrapper = bigPictureTemplate.querySelector('.social__comments');
  var commentsCountBlock = document.querySelector('.social__comment-count');
  var fragment = document.createDocumentFragment();
  var allComments;
  var commentsLoadButton = document.querySelector('.comments-loader');

  var renderComments = function (comments) {
    comments.forEach(function (comment) {
      var template = commentTemplate.cloneNode(true);
      template.querySelector('.social__picture').src = comment.avatar;
      template.querySelector('.social__picture').alt = comment.name;
      template.querySelector('.social__text').textContent = comment.message;
      fragment.appendChild(template);
    });
    commentsWrapper.appendChild(fragment);
  };

  var getCurrentCommentCount = function () {
    return commentsWrapper ? commentsWrapper.children.length : 0;
  };

  var getNextComments = function () {
    var currentIndex = getCurrentCommentCount();
    var nextComments = allComments.slice(currentIndex, currentIndex + COMMENTS_ADD_STEP);
    renderComments(nextComments);
    if (getCurrentCommentCount() === allComments.length || allComments.length <= COMMENTS_ADD_STEP) {
      deactivateLoadButton();
    }
  };

  var clearComment = function () {
    commentsWrapper.innerHTML = '';
  };

  var init = function (comments) {
    allComments = comments;
    clearComment();
    activateLoadButton();
    getNextComments();
    showCommentsCount();
  };

  var onLoadButtonClick = function () {
    getNextComments();
    renderCommentsCount();
  };

  var hideLoadButton = function () {
    commentsLoadButton.classList.add('hidden');
  };

  var showLoadButton = function () {
    commentsLoadButton.classList.remove('hidden');
  };

  var activateLoadButton = function () {
    showLoadButton();
    commentsLoadButton.addEventListener('click', onLoadButtonClick);
  };

  var deactivateLoadButton = function () {
    hideLoadButton();
    commentsLoadButton.removeEventListener('click', onLoadButtonClick);
  };

  var renderCommentsCount = function () {
    var commentsCount = document.createElement('span');
    commentsCount.classList.add('comments-count');
    commentsCount.textContent = getCurrentCommentCount() + ' из ' + allComments.length + ' комментариев';
    commentsCountBlock.textContent = '';
    commentsCountBlock.appendChild(commentsCount);
  };

  var showCommentsCount = function () {
    renderCommentsCount();
    commentsCountBlock.classList.remove('hidden');
  };

  window.comments = {
    init: init
  };
})();
