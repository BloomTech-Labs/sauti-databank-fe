// just talk about methodologies in here for the sub app specifically
import React from "react";

import DashSignup from "./DashSignup";

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

function DashAbout() {
  return (
    // <DashSignup />
    <AboutContainer>
      <AboutHeader>About Sauti Data *NOT FINAL VERSION*</AboutHeader>
      <TopText>
        The ability to provide our users with an easily navigated and simple to
        use tool is our main goal. We separate primary search categories out so
        you know exactly the type of data you should recieve. In addition we
        offer cross-filtering which enables to you narrow down your search and
        get as specfic as you need.
      </TopText>
      <TopText>
        For our premium users, you will be able to not only filter data using
        specifc search criteria, but you can also filter by data to look for
        trends over time or at specfic times of the year. Also for premium
        users, if the graph display of data is not enough for you, you have the
        ability to download all data into a csv file at which point you can use
        the data as you see fit.
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
  );
}

export default DashAbout;
