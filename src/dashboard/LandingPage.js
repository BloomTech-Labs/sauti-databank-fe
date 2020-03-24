import React from "react";
import LandingPageChoropleth from "./LandingPageMap";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const Traders_Query = gql`
  query getTraders {
    allTraders: tradersUsers {
      gender
      country_of_residence
    }
  }
`;

const LandingPage = () => {
  const { data, loading, error } = useQuery(Traders_Query);

  if (loading) {
    // remove an image possibly
    return <div>loading...</div>;
  }

  return (
    <LandingPageStyles>
      <div className="landing-page-row">
        <div className="landing-page-row-col-top">
          <div className="choropleth">
            <LandingPageChoropleth
              data={data}
              loading={loading}
              error={error}
            />
          </div>
        </div>
        <div className="landing-page-row-col-mid"></div>
        <div className="landing-page-row-col-bot"></div>
      </div>
    </LandingPageStyles>
  );
};

const LandingPageStyles = styled.div`
  height: calc(100vh - 7rem);

  .landing-page-row {
    display: flex;
    flex-direction: column;
    height: 100%;

    .landing-page-row-col-top {
      height: 50%;
      background: yellow;

      .choropleth {
        height: 100%;
        width: 100%;
      }
    }

    .landing-page-row-col-mid {
      height: 30%;
      background: green;
    }

    .landing-page-row-col-bot {
      height: 20%;
      background: yellow;
    }
  }
`;

export default LandingPage;
