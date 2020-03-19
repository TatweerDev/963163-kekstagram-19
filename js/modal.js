'use strict';

(function () {
  var activePopup;
  var main = document.querySelector('main');
  var sucessTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');


  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, removePopup);
  };

  var onPopupClick = function (evt) {
    if (evt.target.type === 'button' || evt.target === activePopup) {
      removePopup();
    }
  };

  var showPopup = function (template) {
    activePopup = template;
    main.appendChild(template);
    document.addEventListener('keydown', onPopupEscPress);
    template.addEventListener('click', onPopupClick);
  };

  var showSuccessPopup = function () {
    var successPopup = sucessTemplate.cloneNode(true);
    showPopup(successPopup);
  };

  var showErrorPopup = function () {
    var errorPopup = errorTemplate.cloneNode(true);
    showPopup(errorPopup);
  };

  var removePopup = function () {
    activePopup.remove();
    document.removeEventListener('keydown', onPopupClick);
    activePopup.removeEventListener('click', onPopupEscPress);
  };


  window.modal = {
    showSuccessPopup: showSuccessPopup,
    showErrorPopup: showErrorPopup
  };

})();
