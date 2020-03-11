import React from "react";

import styled from "styled-components";

import {
  AboutContainer,
  AboutText,
  TopText,
  AboutHeader,
  MiddleContent,
  MiddleContentImages,
  Images,
  ImfoSections
} from "./styledComponents/Index";

const FeatureGraph = styled.div`
  font-size: 1.8rem;
  margin: 0 auto;
  width: 85%;
`;
const UserTiers = styled.h1`
  font-size: 2.5rem;
  text-transform: uppercase;
  margin: 0 10%;
`;
const FeatureName = styled.h1`
  font-size: 2.5rem;
  margin-top: 20px;
`;
const FeatureDescription = styled.p`
  opacity: 0.6;
`;
const FlexDivs = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
`;
const CheckBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FeaturesDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const CheckBoxes = styled.p`
  margin: 0 25%;
`;

function DashAbout() {
  return (
    <>
      <FeatureGraph>
        <h1>users "table" here</h1>
        <FlexDivs>
          <FeaturesDiv>
            <FeatureName>Name of feature</FeatureName>
            <FeatureDescription>Feature description here</FeatureDescription>

            <FeatureName>Name of feature</FeatureName>
            <FeatureDescription>Feature description here</FeatureDescription>

            <FeatureName>Name of feature</FeatureName>
            <FeatureDescription>Feature description here</FeatureDescription>

            <FeatureName>Name of feature</FeatureName>
            <FeatureDescription>Feature description here</FeatureDescription>
          </FeaturesDiv>
          <div></div>
          <CheckBoxDiv>
            <UserTiers>Free</UserTiers>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
          </CheckBoxDiv>
          <CheckBoxDiv>
            <UserTiers>Paid</UserTiers>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
          </CheckBoxDiv>
        </FlexDivs>
        {/* feature div */}
        {/* <FlexDivs>
          <ColumnDivs>
            <FeatureName>Name of feature</FeatureName>
            <FeatureDescription>Feature description here</FeatureDescription>
          </ColumnDivs>
          <FlexDivs>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
          </FlexDivs>
        </FlexDivs> */}
        {/* feature div */}
        {/* <FlexDivs>
          <ColumnDivs>
            <FeatureName>Name of feature</FeatureName>
            <FeatureDescription>Feature description here</FeatureDescription>
          </ColumnDivs>
          <FlexDivs>
            <CheckBoxes>✔</CheckBoxes>
            <CheckBoxes>✔</CheckBoxes>
          </FlexDivs>
        </FlexDivs> */}
      </FeatureGraph>
      <AboutContainer>
        <AboutHeader>About Sauti Data *NOT FINAL VERSION*</AboutHeader>
        <TopText>
          The ability to provide our users with an easily navigated and simple
          to use tool is our main goal. We separate primary search categories
          out so you know exactly the type of data you should recieve. In
          addition we offer cross-filtering which enables to you narrow down
          your search and get as specfic as you need.
        </TopText>
        <TopText>
          For our premium users, you will be able to not only filter data using
          specifc search criteria, but you can also filter by data to look for
          trends over time or at specfic times of the year. Also for premium
          users, if the graph display of data is not enough for you, you have
          the ability to download all data into a csv file at which point you
          can use the data as you see fit.
        </TopText>
        <MiddleContent>
          <ImfoSections>
            <Images alt="image goes here" />
            <AboutText>
              This will be text about how to use a specific portion of this app
              with a picture.
            </AboutText>
          </ImfoSections>
          <ImfoSections>
            <Images alt="image goes here" />
            <AboutText>
              This will be text about how to use a specific portion of this app
              with a picture.
            </AboutText>
          </ImfoSections>
          <ImfoSections>
            <Images alt="image goes here" />
            <AboutText>
              This will be text about how to use a specific portion of this app
              with a picture.
            </AboutText>
          </ImfoSections>
        </MiddleContent>
      </AboutContainer>
    </>
  );
}

export default DashAbout;
