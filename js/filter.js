'use strict';

(function () {
  var RANDOM_IMG_COUNT = 10;
  var Filter = {
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed'
  };
  var postData;
  var imageFilters = document.querySelector('.img-filters');

  var toggleActiveClass = function (evt) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.classList.add('img-filters__button--active');
  };

  var selectFilter = function (evt) {
    var filterId = evt.target.id;
    switch (filterId) {
      case Filter.RANDOM: {
        randomPost();
        break;
      }
      case Filter.DISCUSSED: {
        discussPost();
        break;
      }
      default: {
        defaultPosts();
      }
    }
  };

  var randomPost = function () {
    var randomize = window.utils.shuffleArray(postData).slice(0, RANDOM_IMG_COUNT);
    updatePosts(randomize);
  };

  var discussPost = function () {
    var localData = postData.slice(0);
    var sortDiscussed = localData.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    updatePosts(sortDiscussed);
  };

  var defaultPosts = function () {
    updatePosts(postData);
  };

  var showFilter = function () {
    imageFilters.classList.remove('img-filters--inactive');
  };

  var updatePosts = function (posts) {
    var pictures = document.querySelectorAll('.container.pictures a.picture');
    pictures.forEach(function (elem) {
      elem.remove();
    });
    window.gallery.renderPosts(posts);
  };

  // Вызов функции
  var handleImageFilterClick = window.debounce(function (evt) {
    toggleActiveClass(evt.target);
    selectFilter(evt);
  });

  var onImgFilterClick = function (evt) {
    if (evt.target.type === 'button') {
      handleImageFilterClick(evt);
    }
  };

  var activateFilters = function (userPictures) {
    postData = userPictures;
    showFilter();
    imageFilters.addEventListener('click', onImgFilterClick);
  };

  window.filter = {
    activate: activateFilters
  };
})();
