'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.img-upload__input');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectsPreview = document.querySelectorAll('.effects__preview');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      var onReaderLoad = function () {
        imagePreview.src = reader.result;
        effectsPreview.forEach(function (preview) {
          preview.style.backgroundImage = 'url(' + reader.result + ')';
        });
        window.form.showEditForm();
      };
      reader.addEventListener('load', onReaderLoad);

      reader.readAsDataURL(file);
    }
  });
})();
