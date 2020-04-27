import React from "react";
import { useHistory } from "react-router-dom";
import { LandingPageStyles } from "./styledComponents/LandingPage";
import Image from "./Images/landing-age-hero-img.png";
import BarGraph from "./Images/BarGraph";
import SearchSVG from "./Images/Search";
import DashboardSVG from "./Images/DashboardSVG";
import GraphImageDiv from "./styledComponents/GraphImageDiv";

const LandingPage = props => {
  // let thisLocation = props.history.location.pathname;
  const history = useHistory();
  const handleReturn = e => {
    e.preventDefault();
    history.push("/data");
  };

  const handleCreateAccount = e => {
    e.preventDefault();
    history.push("/signup");
  };

  let TopImage = Image;

  return (
    <LandingPageStyles TopImage={TopImage}>
      <div className="landing-page-row">
        <div className="combine">
          <div className="landing-page-row-col-top">
            <div className="top-col-top">
              <h2>Data collection and assessment</h2>
            </div>
            <div className="top-col-mid">
              <h1>Examine data gathered from cross-border</h1>
              <h1>African Traders</h1>
            </div>
            <div className="top-col-bot">
              <button onClick={handleCreateAccount}>Create an account</button>
              <button onClick={handleReturn}>Go to data</button>
            </div>
          </div>
        </div>

        <div className="landing-page-row-col-bot">
          <div className="row-col-bot-whatwedo">
            <div className="bot-col-header">
              <h2>What we do</h2>
            </div>
            <div className="bot-col-disc">
              <p>
                Sauti Databank is an organization that collects data from
                cross-border African traders, bringing reliable information to
                researchers and government officials
              </p>
            </div>
          </div>
        </div>

        <div className="landing-page-row-col-mid">
          <div className="col-bot-image">
            <div className="img-background">
              <GraphImageDiv />
            </div>
          </div>
        </div>

        <div className="landing-page-row-col-bot-two">
          <div className="bot-two-row">
            <div className="bot-two-col">
              <DashboardSVG />
              <div className="col-header">
                <h2>Dashboard</h2>
              </div>
              <div className="col-disc">
                <p>Explore the data with our interactive dashboard.</p>
              </div>
              <div className="col-learn-more">
                <button>Learn More</button>
              </div>
            </div>
            <div className="bot-two-col">
              <BarGraph />
              <div className="col-header">
                <h2>Data</h2>
              </div>
              <div className="col-disc">
                <p> Download political violence and protest data.</p>
              </div>
              <div className="col-learn-more">
                <button>Learn More</button>
              </div>
            </div>
            <div className="bot-two-col">
              <SearchSVG />
              <div className="col-header">
                <h2>Analysis</h2>
              </div>
              <div className="col-disc">
                <p>Downloadable data reports into excel.</p>
              </div>
              <div className="col-learn-more">
                <button>Learn More</button>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-page-row-col-bot-footer">
          <div className="col-bot-footer-row">
            <div className="col-bot-footer-row-col-top">
              <p>
                Sauti Databank is a non-profit organization working to improve
                the lives of African people trading their goods accross the
                borders in Kenyan, Ugandan, and Rwandan. We are excited to work
                with researchers and government officials alike to improve laws
                and make the lives of traders better.
              </p>
            </div>
            <div className="col-bot-footer-row-col-bot">
              <div className="footer-col-bot-footer-list">
                <span>Privacy Policy</span>
                <span>Terms of Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingPageStyles>
  );
};

export default LandingPage;
