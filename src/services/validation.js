export function correctHashtag(value) {
  let status = {};

  if (typeof value === 'string') {
    const hashtags = value.split(' ');

    for (let hashtag of hashtags) {
      if (!hashtag.trim().match(/^#[^#]+$/)) {
        return 'Неверный формат';
      }
    }
  }
}
