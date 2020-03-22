const minSize = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "414px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "2560px"
};

const maxSize = {
  mobileS: "568px",
  mobileM: "667px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1600px",
  desktop: "2560px"
};

export const device = {
  mobileS: `(min-width: ${minSize.mobileS})`,
  mobileM: `(min-width: ${minSize.mobileM})`,
  mobileL: `(min-width: ${minSize.mobileL})`,
  tablet: `(min-width: ${minSize.tablet})`,
  laptop: `(min-width: ${minSize.laptop}) and (max-width: ${maxSize.laptop})`,
  desktop: `(min-width: ${minSize.desktop})`,
  desktopL: `(min-width: ${minSize.desktop})`
};

export const retinaDevice = {
  mobileS: `(min-width: ${minSize.mobileS})`,
  mobileM: `(min-width: ${minSize.mobileM})`,
  mobileL: `(min-width: ${minSize.mobileL})`,
  tablet: `(min-width: ${minSize.tablet})`,
  laptop: `(min-width: ${minSize.laptop}, max-width: ${maxSize.laptop}, -webkit-min-device-pixel-ratio: 2, min-resolution: 192dpi)`,
  desktop: `(min-width: ${minSize.desktop})`,
  desktopL: `(min-width: ${minSize.desktop})`
};
