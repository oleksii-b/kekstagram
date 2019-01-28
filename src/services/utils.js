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

export function toggleBodyOverflow(option) {
  document.body.style.overflow = option;
}
