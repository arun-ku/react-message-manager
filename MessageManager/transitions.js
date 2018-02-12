export const transitionStylesDesktop = {
  initial: {
    bottom: -1000,
    width: 0,
    marginLeft: 0,
    padding: 0,
    height: 0,
  },
  final: {
    bottom: 0,
    width: 'auto',
    height: 'auto',
    padding: '15px 30px 15px 15px',
    marginLeft: 10,
  },
};

export const transitionStylesMobile = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
  },
};

export default (desktopView) => {
  if (desktopView) {
    return transitionStylesDesktop;
  }
  return transitionStylesMobile;
};