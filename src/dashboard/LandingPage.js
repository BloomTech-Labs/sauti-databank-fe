import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Image from "./Images/AfricaImageOne.jpg";
import GraphImage from "./Images/GraphImage.png";
import GraphLine from "./Images/LineGraph";
import SearchSVG from "./Images/Search";
import GraphImageDiv from "./styledComponents/GraphImageDiv";

// const Traders_Query = gql`
//   query getTraders {
//     allTraders: tradersUsers {
//       gender
//       country_of_residence
//     }
//   }
// `;

const LandingPage = props => {
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

  // const { data, loading, error } = useQuery(Traders_Query);

  // if (loading) {
  //   // remove an image possibly
  //   return <div>loading...</div>;
  // }

  return (
    <LandingPageStyles TopImage={TopImage}>
      <div className="landing-page-row">
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
        <div className="landing-page-row-col-mid">
          <div className="col-mid-image">
            <GraphImageDiv />
          </div>
        </div>
        <div className="landing-page-row-col-bot">
          <div className="bot-col-header">
            <h2>What we do</h2>
          </div>
          <div className="bot-col-disc">
            <p>
              Sauti Databank is an organization that collects data from
              cross-border African traders, bringing reliable information of
              researchers and government officials
            </p>
          </div>
        </div>
        <div className="landing-page-row-col-bot-two">
          <div className="bot-two-row">
            <div className="bot-two-col">
              <GraphLine />
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
              <GraphLine />
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
                <p>Real ACLED reports and infographics.</p>
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

const LandingPageStyles = styled.div`
  font-family: "Roboto", sans-serif;
  height: 100%;

  .landing-page-row {
    display: flex;
    flex-direction: column;
    height: 100%;

    .landing-page-row-col-top {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      padding: 1rem;
      height: 30rem;
      background: linear-gradient(
          rgba(255, 255, 255, 0.52),
          rgba(255, 255, 255, 0.52)
        ),
        ${props => `url(${props.TopImage})`};
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      background-position: center center;

      .top-col-top {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 33.33%;
        h2 {
          color: #2c2e32;
          font-weight: 400;
          font-size: 3rem;
        }
      }
      .top-col-mid {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 33.33%;

        h1 {
          color: #2c2e32;
          padding: 0.5rem;
          font-weight: 800;
          font-size: 4rem;
        }
      }
      .top-col-bot {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 33.33%;

        button {
          margin: 2vw;
          height: 2vw;
          width: 10vw;
          font-weight: 800;
          font-size: 1.6rem;
          color: #ffffff;
          background: #eb5e52;
          border: 2px solid #eb5e52;
          text-decoration: none;
          border-radius: 2px;
          transition: 0.5s ease;
          &:hover {
            color: black;
            cursor: pointer;
            border: 1px solid black;
          }
        }
      }
    }

    .landing-page-row-col-mid {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;

      .col-mid-image {
        width: 90vw;
        height: 100%;
      }
    }

    .landing-page-row-col-bot {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-top: 2px solid rgba(0, 0, 0, 0.1);
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      height: 20rem;

      .bot-col-header {
        h2 {
          text-transform: uppercase;
          color: #2c2e32;
          font-weight: 400;
          font-size: 2rem;
        }
      }

      .bot-col-disc {
        text-align: center;
        padding: 1rem;
        width: 45vw;
        p {
          line-height: 1.2;
          color: #2c2e32;
          font-weight: 400;
          font-size: 2.5rem;
        }
      }
    }

    .landing-page-row-col-bot-two {
      height: 30rem;

      .bot-two-row {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;

        .bot-two-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 33.33%;

          .col-header {
            padding: 1rem;
            h2 {
              color: #2c2e32;
              font-weight: 400;
              font-size: 3rem;
            }
          }

          .col-disc {
            padding: 1rem;
            p {
              color: #54575f;
              font-weight: 400;
              font-size: 2rem;
            }
          }

          .col-learn-more {
            padding: 1rem;
            button {
              height: 2vw;
              width: 10vw;
              font-weight: 500;
              font-size: 2rem;
              color: #2c2e32;
              background: transparent;
              border: 2px solid rgba(0, 0, 0, 0.3);
              text-decoration: none;
              border-radius: 2px;
              transition: 0.5s ease;
              &:hover {
                color: black;
                cursor: pointer;
                border: 2px solid #f5af37;
              }
            }
          }
        }
      }
    }

    .landing-page-row-col-bot-footer {
      background: #2c2e32;
      color: #ffffff;
      height: 30rem;
      width: 100%;
      .col-bot-footer-row {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .col-bot-footer-row-col-top {
          display: flex;
          justify-content: center;
          align-items: center;

          height: 50%;
          width: 100%;

          p {
            line-height: 1.5;
            text-align: center;
            width: 50vw;
            font-weight: 400;
            font-size: 1.5rem;
          }
        }

        .col-bot-footer-row-col-bot {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50%;

          width: 100%;

          .footer-col-bot-footer-list {
            height: 100%;
            width: 50vw;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;

            span {
              font-weight: 400;
              font-size: 1.5rem;
            }
          }
        }
      }
    }
  }
`;

export default LandingPage;
