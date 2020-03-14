'use strict';

// Функция получения данных от сервера
(function () {
  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_TIME = 10000;

  var statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
    SERVER_UNAVAILABLE: 503,
    SERVER_OFF: 521
  };
  var serverRequest = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onerror = function () {
      onError('Произошла ошибка соединения' + xhr.status + ' ' + xhr.statusText);
    };

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TIMEOUT_TIME;

    });
    xhr.open(method, url);
    xhr.send(data);
  };
  var getData = function (url, onLoad, onError) {
    serverRequest('GET', url, onLoad, onError);
  };
  var postData = function (url, onLoad, onError, data) {
    serverRequest('POST', url, onLoad, onError, data);
  };

  window.backend = {
    GET_URL: GET_URL,
    POST_URL: POST_URL,
    getData: getData,
    postData: postData
  };
})();
