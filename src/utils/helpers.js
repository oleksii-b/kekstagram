export const getEffectLevelValue = ({effectName, effectLevel}) => {
  switch (effectName) {
    case 'chrome':
      // grayscale(0...1)
      return `grayscale(${effectLevel / 100})`;
    case 'sepia':
      // sepia(0...1)
      return `sepia(${effectLevel / 100})`;
    case 'marvin':
      // invert(0...100%)
      return `invert(${effectLevel}%)`;
    case 'phobos':
      // blur(0...3px)
      return `blur(${effectLevel * 3 / 100}px)`;
    case 'heat':
      // brightness(1...3)
      return `brightness(${effectLevel * 2 / 100 + 1})`;
  }
};

export function toggleBodyOverflow(option) {
  document.body.style.overflow = option;
};
