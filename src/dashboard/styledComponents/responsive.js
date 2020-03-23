const minSize = {
  laptop: "1024px",
  desktop: "1600px",
  desktopL: "2300px",
  desktopXL: "3115px"
};

const maxSize = {
  tablet: "1024px",
  laptop: "1600px",
  desktop: "2560px",
  desktopL: "3115px"
};

export const device = {
  tablet: `(max-width: ${maxSize.tablet})`,
  laptop: `(min-width: ${minSize.laptop}) and (max-width: ${maxSize.laptop})`,
  desktop: `(min-width: ${minSize.desktop}) and (max-width: ${maxSize.desktop})`,
  desktopL: `(min-width: ${minSize.desktopL}) and (max-width: ${maxSize.desktopL})`,
  desktopXL: `(min-width: ${minSize.desktopXL})`
};
