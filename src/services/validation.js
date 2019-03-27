export function correctHashtag(value) {
  let status = {};

  if (typeof value === 'string') {
    const hashtags = value.trim().split(' ');

    for (let hashtag of hashtags) {
      if (!hashtag.match(/^#[^#]+$/)) {
        return 'Неверный формат';
      }
    }
  }
}
