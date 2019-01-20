export function uploadPicture() {
  document.getElementById('uploadFile').click();
}

export function getValidationStatus(options) {
  let status = {};

  if (typeof options.hashtags === 'string') {
    const hashtags = val.split(' ');

    for (let hashtag of hashtags) {
      if (!hashtag.trim().match(/^#[^#]+$/)) {
        return {
          ...status,
          hashtags: false
        };
      }
    }

    return {
      ...status,
      hashtags: false
    };
  }
}

export function togglePictureEditorDisplay(options) {
  if (options.show === true) {
    document.getElementById('pictureEditor').classList.remove('hidden');
  }

  if (options.show === false) {
    document.getElementById('pictureEditor').classList.add('hidden');

    if (options.clear === true) {
      document.getElementById('uploadFile').value = '';
    }
  }
}
