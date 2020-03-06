'use strict';

// Функция, создающая массив с данными фото пользователей

(function (){
  var numberOfNamesAndAvatars = 6;
  var messageMassive = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var namesMassive = [
    'Артем',
    'Сергей',
    'Игорь',
    'Вадим',
    'Лера',
    'Саша'
  ];
  var numberOfPictures = 25;

  var generateData = function () {
    var userPictures = [];
    var generateComments = function () {
      var commentsArray = [];
      for (var j = 0; j < window.utils.getRandomMinMaxIndex(1, 30); j++) {
        commentsArray.push(
            {
              avatar: 'img/avatar-' + window.utils.getRandomMinMaxIndex(1, 6) + '.svg',
              message: messageMassive[window.utils.getRandomIndex(messageMassive)],
              name: namesMassive[window.utils.getRandomIndex(numberOfNamesAndAvatars)]
            }
        );
      }
      return commentsArray;
    };
    for (var i = 0, j = 1; i < numberOfPictures; i++, j++) {
      var renderPhotoInfo = {
        url: 'photos/' + j + '.jpg',
        description: 'описание фото',
        likes: window.utils.getRandomMinMaxIndex(15, 200),
        comments: generateComments()
      };
      userPictures.push(renderPhotoInfo);
    }
    return userPictures;
  };
  window.data = {
    generateData:  generateData
  };

})();

