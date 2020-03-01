'use strict';

var numberOfPictures = 25;
var numberOfNamesAndAvatars = 6;
var namesMassive = [
  'Артем',
  'Сергей',
  'Игорь',
  'Вадим',
  'Лера',
  'Саша'];
var messageMassive = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var pictureUserTemplate = document.querySelector('.pictures');
var bigPictureTemplate = document.querySelector('.big-picture');
var documentBody = document.querySelector('body');
var randomPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var escapeButton = 27;

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
  var generateComments = function () {
    var commentsArray = [];
    for (var j = 0; j < getRandomMinMaxIndex(1, 30); j++) {
      commentsArray.push(
          {
            avatar: 'img/avatar-' + getRandomMinMaxIndex(1, 6) + '.svg',
            message: messageMassive[getRandomIndex(messageMassive)],
            name: namesMassive[getRandomIndex(numberOfNamesAndAvatars)]
          }
      );
    }
    return commentsArray;
  };
  for (var i = 0, j = 1; i < numberOfPictures; i++, j++) {
    var renderPhotoInfo = {
      url: 'photos/' + j + '.jpg',
      description: 'описание фото',
      likes: getRandomMinMaxIndex(15, 200),
      comments: generateComments()
    };
    userPictures.push(renderPhotoInfo);
  }
  return userPictures;
};

// Зададим функцию открытия полноразмерного фото при клике на него


// Создаем структуру DOM элементов
var renderFoto = function (photo) {
  var userElement = randomPictureTemplate.cloneNode(true);
  userElement.querySelector('.picture__img').src = photo.url;
  userElement.querySelector('.picture__likes').textContent = photo.likes;
  userElement.querySelector('.picture__comments').textContent = photo.comments.length;
  userElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    renderPhotoPopup(photo);
    showBigPicture();    
  })
  return userElement;
};

// Создаем фрагмент из массива элементов
var makeFragment = function (array) {
  var fragment = document.createDocumentFragment();
  array.forEach(function (element) {
    fragment.appendChild(renderFoto(element));
  });
  return fragment;
};

// Вставляем сгенерированный массив в разметку
var showPhotos = function () {
  var userPictures = generateData();
  pictureUserTemplate.appendChild(makeFragment(userPictures));
};

// Объявляем функцию удаляющую класс из элемента и применим ее к показу фото
var removeClassFromElement = function (element, className) {
  element.classList.remove(className);
};

var showBigPicture = function () {  
  removeClassFromElement(bigPictureTemplate, 'hidden');
};

// Объявляем функцию, создающую  DOM элементы из массива

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

// Скрываем блоки счетчика комментариев и загрузки новых комментариев. Создадим для этого функцию, и применим ее.
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

// Добавим событие закрытия окна показа фото при нажатии на крестик или Esc
var bigPictureCancel = bigPictureTemplate.querySelector('#picture-cancel');
var closeBigPicture =  function () {
  addClassToElement(bigPictureTemplate,'hidden');
  removeClassFromElement(documentBody, 'modal-open');
};
bigPictureCancel.addEventListener('click', function () {
  closeBigPicture();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === escapeButton) {
    closeBigPicture();
  }
});

// Добавим событие показа формы редактирования изображения при изменении в поле загрузки файла
var photosUploadButton = document.querySelector('#upload-file');
var photosRedactForm =  document.querySelector('.img-upload__overlay');
var showRedactForm = function () {
  removeClassFromElement(photosRedactForm, 'hidden');
  addClassToElement(documentBody, 'modal-open');
  document.addEventListener('keydown', btnEscHandler);
}
photosUploadButton.addEventListener('change', function () {   
  showRedactForm();
});

// Обработчик нажатия клавиши Esc
var btnEscHandler = function (evt) {
  if (evt.keyCode === escapeButton) {
    closePhotoRedactForm();
  }
};

// Добавим событие скрытия формы редактирования изображения при клике на крестик
var formCloseButton = photosRedactForm.querySelector('#upload-cancel');
var closePhotoRedactForm = function () {
  addClassToElement(photosRedactForm, 'hidden');
  removeClassFromElement(documentBody, 'modal-open');
};
formCloseButton.addEventListener('click', function () {
  closePhotoRedactForm();
});

// Блокировка закрытия окна редактирования фото при фокусе на поле хеш-тегов или сообщения
document.addEventListener('focusin', function () {
  if (document.hasFocus() && document.activeElement.classList.contains('text__hashtags')
  || document.activeElement.classList.contains('text__description')) {
  document.removeEventListener('keydown', btnEscHandler);
  }
});

// Добавим событие при захвате бегунка настройки глубины эффекта
var effectLevelPin = document.querySelector('.effect-level__pin');
effectLevelPin.addEventListener('mouseup', function () {
  console.log('mouseUp')
});

showPhotos();
//showPictureByClick();
//showBigPicture();
//renderPhotoPopup(generateData()[4]);
//hideElements();

