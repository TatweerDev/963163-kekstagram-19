'use strict';

(function () {
  var Scale = {
    MAX_VALUE: 100,
    MIN_VALUE: 25,
    STEP: 25,
    DEFAULT: 100
  };

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgScaleWrapper = document.querySelector('.scale');
  var scaleControl = imgScaleWrapper.querySelector('.scale__control--value');
  var scaleControlSmaller = imgScaleWrapper.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgScaleWrapper.querySelector('.scale__control--bigger');
  var scaleBtn = document.querySelector('.img-upload__scale');

  var resetImgScale = function () {
    scaleControl.value = Scale.DEFAULT + '%';
    imgUploadPreview.style.transform = 'scale(' + Scale.DEFAULT / 100 + ')';
  };

  var scaleImage = function (scaleValue) {
    scaleControl.value = scaleValue + '%';
    imgUploadPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
  };

  var onScaleBtnClick = function (evt) {
    var currentScaleValue = parseInt(scaleControl.value, 10);
    if (evt.target === scaleControlSmaller && currentScaleValue !== Scale.MIN_VALUE
    ) {
      scaleImage(currentScaleValue - Scale.STEP);
    } else if (evt.target === scaleControlBigger && currentScaleValue !== Scale.MAX_VALUE) {
      scaleImage(currentScaleValue + Scale.STEP);
    }
  };

  var activate = function () {
    resetImgScale();
    scaleBtn.addEventListener('click', onScaleBtnClick);
  };

  var deactivate = function () {
    resetImgScale();
    scaleBtn.removeEventListener('click', onScaleBtnClick);
  };

  window.zoom = {
    activate: activate,
    deactivate: deactivate
  };
})();
