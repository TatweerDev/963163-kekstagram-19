'use strict';

var pictureUserTemplate = document.querySelector('.pictures');
var randomPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

// Задаем функцию получения рандомного индекса 

var getRandomMinMaxIndex = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// Объявляем функцию созданющую массив с данными фото пользователей

var numberOfPictures = 25;
var numberOfNamesAndAvatars = 6;
var namesMassive = ['Артем', 'Сергей','Игорь','Вадим','Лера','Саша'];
var messageMassive = ['Всё отлично!','В целом всё неплохо. Но не всё','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
var photoInfo = function () {
  var userPictures = [];
for (var i = 1; i < numberOfPictures; i++) {
  var renderPhotoInfo = {
    url: 'photos/' + i + '.jpg',
    description: 1,
    likes: getRandomMinMaxIndex(15, 200),
    comments: [
      {
        avatar: 'img/avatar-' + [getRandomIndex(numberOfNamesAndAvatars)] + '.svg',
        message: messageMassive[getRandomIndex(messageMassive)],
        name: namesMassive[getRandomIndex(numberOfNamesAndAvatars)]
      }
    ]
  }
  userPictures.push(renderPhotoInfo);  
  }
  return userPictures;  
};

// Создаем DOM элемент и вкладываем в него данные из массива
var renderFoto = function () {
  var userPictures = photoInfo();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < userPictures.length; i++) {
  var userElement = randomPictureTemplate.cloneNode(true);
  userElement.querySelector('.picture__img').src = userPictures[i].url;  
  userElement.querySelector('.picture__likes').textContent = userPictures[i].likes;
  userElement.querySelector('.picture__comments').textContent = userPictures[i].comments[0].message.length;
  console.log(userPictures[i].comments.message)
  fragment.appendChild(userElement);
  }
  pictureUserTemplate.appendChild(fragment);
};

renderFoto()
