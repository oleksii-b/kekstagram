export function correctHashtag(value) {
  if (typeof value === 'string') {
    const hashtags = value.trim().split(' ');

    for (let hashtag of hashtags) {
      if (!hashtag.match(/^#[^#]+$/)) {
        return 'Неверный формат';
      }
    }
  }
};
