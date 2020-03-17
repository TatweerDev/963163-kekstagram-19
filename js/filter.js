'use strict';

(function () {
  var RANDOM_IMG_COUNT = 10;

  var imgFilter = function (data) {
    var onImgFilterClick = function (evt) {
      evt.preventDefault();
      var target = evt.target;
      if (!target.classList.contains('img-filters__button--active') && target.classList.contains('img-filters__button')) {
        document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
      }
      var newData = data;
      if (target.id === 'filter-random') {
        newData = randomFilter(data);
      } else if (target.id === 'filter-discussed') {
        newData = sortOnComments(data);
      }
      resetAllElements(document.querySelectorAll('.container.pictures a.picture'));
      window.gallery.showPhotos(newData);
    };
    document.querySelector('.img-filters__form').addEventListener('click', onImgFilterClick);
  };
  var randomFilter = function (data) {
    var total = [];
    var localData = data.slice(0);
    for (var i = 0; i < RANDOM_IMG_COUNT; i++) {
      total = total.concat(localData.splice(window.utils.getRandomIndex(0, localData.length), 1));
    }
    return total;
  };
  var sortOnComments = function (data) {
    var localData = data.slice(0);
    return localData.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };
  var resetAllElements = function (elements) {
    elements.forEach(function (elem) {
      elem.remove();
    });
  };

  window.filter = {
    imgFilter: imgFilter
  };
})();
