import { transitionStylesDesktop, transitionStylesMobile } from './transitions';

const desktopStyles = {
  messageContainer: {
    position: 'fixed',
    fontFamily: 'lato',
    bottom: 0,
    color: '#fff',
    zIndex: 99999999,
    backgroundColor: 'transparent !important',
    width: '100%',
    pointerEvents: 'none',
  },
  textBase: {
    background: '#353535',
    display: 'inline-block',
    borderRadius: 3,
    maxWidth: '15%',
    marginBottom: 15,
    // float: 'left',
    transition: `all ${200}ms ease-in-out`,
    position: 'relative',
    bottom: 10,
    overflow: 'hidden',
    paddingRight: 30,
    boxShadow: '2px 2px 8px rgba(0,0,0,.5)',
    pointerEvents: 'all',
    fontWeight: 600,
    padding: '15px 30px 15px 15px',
    marginLeft: 10,
    verticalAlign: 'bottom',
    ...transitionStylesDesktop.initial,
  },
  textBaseInvisible: {
    background: '#353535',
    display: 'inline-block',
    borderRadius: 3,
    maxWidth: '20%',
    marginBottom: 15,
    float: 'left',
    transition: `all ${500}ms ease-in-out`,
    position: 'relative',
    bottom: -1000,
    overflow: 'hidden',
    paddingRight: 30,
    boxShadow: '2px 2px 8px rgba(0,0,0,.5)',
    visibility: 'hidden',
    fontWeight: 600,
    padding: '15px 30px 15px 15px',
    marginLeft: 10,
    ...transitionStylesDesktop.initial,
  },
  errorBase: {
    background: '#c0392b',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
    fontStyle: 'normal',
  },
  message: {
    wordBreak: 'break-word',
  },
  crossIcon: {
    fontStyle: 'normal',
    position: 'absolute',
    right: -20,
    top: 0,
    cursor: 'pointer',
    color: '#ecf0f1',
  },
};

const mobileStyles = {
  ...desktopStyles,
  textBase: {
    ...desktopStyles.textBase,
    maxWidth: 'auto',
    display: 'block',
    width: '100%',
    fontSize: 38,
    boxSizing: 'border-box',
    padding: 30,
    bottom: 10,
    fontWeight: 800,
    height: 'auto',
    position: 'static',
    marginBottom: 5,
    ...transitionStylesMobile.initial,
  },
  textContainer: {
    position: 'relative',
  },
  text: {
  },
  icon: {
    width: '5%',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  message: {
    maxWidth: '92%',
    display: 'inline-block',
    wordBreak: 'break-word',
  },
  crossIcon: {
    fontStyle: 'normal',
    position: 'absolute',
    right: -12,
    top: 0,
    cursor: 'pointer',
    color: '#ecf0f1',
  },
};
export default (desktopView) => {
  if (desktopView) {
    return desktopStyles;
  }
  return mobileStyles;
};