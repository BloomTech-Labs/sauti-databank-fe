import React from "react";

const SocialMedia = () => {
  return (
    <>
      <div className="dwnld-btn">
        {tier === "ADMIN" ||
        tier === "PAID" ||
        tier === "GOV_ROLE" ||
        newSub ? (
          <>
            <SocialMediaContainer className="social-media-container">
              <IconContainer>
                <ShareDiv>Share:</ShareDiv>
                <CsvDownloader
                  track={track}
                  datas={makeValues(csvDownload)}
                  columns={makeHeaders(csvDownload)}
                  filename={fileName}
                  suffix={`${new Date().toISOString()}`}
                >
                  <DownloadText className="csv-download">Download</DownloadText>
                </CsvDownloader>
                <CopyUrlButton className="btn">Copy URL</CopyUrlButton>
                <div>
                  <SocialMediaIconsTwitter
                    className="twitter-share-button"
                    target="_blank"
                    href={`https://twitter.com/intent/tweet?text=https://www.databank.sautiafrica.org/data${socialMediaLink}`}
                  >
                    <i className="fab fa-twitter"></i>
                  </SocialMediaIconsTwitter>
                </div>
                <div
                  className="fb-share-button"
                  data-href={`https://www.databank.sautiafrica.org/data${socialMediaLink}`}
                  data-layout="button"
                  data-size="small"
                >
                  <SocialMediaIconsFacebook
                    target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://www.databank.sautiafrica.org/data${socialMediaLink}&amp;src=sdkpreparse`}
                    className="fb-xfbml-parse-ignore"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </SocialMediaIconsFacebook>
                </div>
              </IconContainer>
            </SocialMediaContainer>
          </>
        ) : (
          <>
            <SocialMediaContainer className="social-media-container">
              <IconContainer>
                <ShareDiv>Share:</ShareDiv>
                <DownloadModal />
                <CopyUrlButton className="btn">Copy URL</CopyUrlButton>
                <div>
                  <SocialMediaIconsTwitter
                    className="twitter-share-button"
                    target="_blank"
                    href="https://twitter.com/intent/tweet?text=This%20website%20is%20awesome!"
                  >
                    <i className="fab fa-twitter"></i>
                  </SocialMediaIconsTwitter>
                </div>
                <div
                  className="fb-share-button"
                  data-href="https://blissful-pare-60612f.netlify.com/data"
                  data-layout="button"
                  data-size="small"
                >
                  <SocialMediaIconsFacebook
                    target="_blank"
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
                    className="fb-xfbml-parse-ignore"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </SocialMediaIconsFacebook>
                </div>
              </IconContainer>
            </SocialMediaContainer>
          </>
        )}
      </div>
    </>
  );
};
export default SocialMedia;
