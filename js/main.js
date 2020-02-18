'use strict';

var numberOfPictures = 25;
var numberOfNamesAndAvatars = 6;
var namesMassive = ['Артем', 'Сергей', 'Игорь', 'Вадим', 'Лера', 'Саша'];
var messageMassive = ['Всё отлично!', 'В целом всё неплохо. Но не всё', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var pictureUserTemplate = document.querySelector('.pictures');
var bigPictureTemplate = document.querySelector('.big-picture');
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
var generateData = function () {
  var userPictures = [];
  var generateComments = function() {
    var commentsArray = []
    for (var j = 0; j < getRandomMinMaxIndex(1,30); j++) {
      commentsArray.push(
        {
          avatar: 'img/avatar-' + getRandomMinMaxIndex(1,6) + '.svg',
          message: messageMassive[getRandomIndex(messageMassive)],
          name: namesMassive[getRandomIndex(numberOfNamesAndAvatars)]
        }
      )
    }
    return commentsArray;
  };
  for (var i = 1; i < numberOfPictures; i++) {
    var renderPhotoInfo = {
      url: 'photos/' + i + '.jpg',
      description: 'описание фото',
      likes: getRandomMinMaxIndex(15, 200),
      comments: generateComments()
    };
    userPictures.push(renderPhotoInfo);
  }
  return userPictures;
};

// Создаем структуру DOM элементов
var renderFoto = function (photo) {
  var userElement = randomPictureTemplate.cloneNode(true);
  userElement.querySelector('.picture__img').src = photo.url;
  userElement.querySelector('.picture__likes').textContent = photo.likes;
  userElement.querySelector('.picture__comments').textContent = photo.comments.length;    
  return userElement;
}

//Создаем фрагмент из массива элементов
var makeFragment = function (array) {
  var fragment = document.createDocumentFragment();
  array.forEach(element => {
    fragment.appendChild(renderFoto(element));
  });
  return fragment;
}

//Вставляем сгенерированный массив в разметку
var showPhotos = function () {
  var userPictures = generateData();  
  pictureUserTemplate.appendChild(makeFragment(userPictures));
};

//Объявляем функцию удаляющую класс из элемента и применим ее к показу фото
var removeClassFromElement = function(element, className) {
   element.classList.remove(className);
};

var showBigPicture = function() {
  var bigPicture = document.querySelector('.big-picture');
  removeClassFromElement(bigPicture,'hidden');
};

//Объявляем функцию, создающую  DOM элементы из массива 

var renderPhotoPopup = function(post) {
  var fragment = document.createDocumentFragment();
  var commentsWrapper = bigPictureTemplate.querySelector('.social__comments')
  var commentTemplate = bigPictureTemplate.querySelector('.social__comment')
  bigPictureTemplate.querySelector('.big-picture__img img').src = post.url;
  bigPictureTemplate.querySelector('.likes-count').textContent = post.likes;
  bigPictureTemplate.querySelector('.comments-count').textContent = post.comments.length;
  post.comments.forEach(comment => {    
    var template = commentTemplate.cloneNode(true);
    template.querySelector('.social__picture').src = comment.avatar;
    template.querySelector('.social__picture').alt = comment.name;
    template.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(template);
  })
  bigPictureTemplate.querySelector('.social__caption').textContent = post.description;
  commentsWrapper.appendChild(fragment)
};

//Скрываем блоки счетчика комментариев и загрузки новых комментариев. Создадим для этого функцию, и применим ее.
var addClassToElement = function(element, className) {
  element.classList.add(className);
};
var hideElements = function() {
  var commentsCounter = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var documentBody = document.querySelector('body');
  addClassToElement(commentsCounter,'hidden');
  addClassToElement(commentsLoader,'hidden');
  addClassToElement(documentBody,'modal-open');
};

showPhotos()
showBigPicture();
renderPhotoPopup(generateData()[5]);
hideElements();
