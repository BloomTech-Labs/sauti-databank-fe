const minSize = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "414px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1600px",
  desktopL: "2300px",
  desktopXL: "3115px"
};

const maxSize = {
  mobileS: "568px",
  mobileM: "667px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1600px",
  desktop: "2560px",
  desktopL: "3115px"
};

export const device = {
  mobileS: `(min-width: ${minSize.mobileS})`,
  mobileM: `(min-width: ${minSize.mobileM})`,
  mobileL: `(min-width: ${minSize.mobileL})`,
  tablet: `(min-width: ${minSize.tablet})`,
  laptop: `(min-width: ${minSize.laptop}) and (max-width: ${maxSize.laptop})`,
  desktop: `(min-width: ${minSize.desktop}) and (max-width: ${maxSize.desktop})`,
  desktopL: `(min-width: ${minSize.desktopL}) and (max-width: ${maxSize.desktopL})`,
  desktopXL: `(min-width: ${minSize.desktopXL})`
};
