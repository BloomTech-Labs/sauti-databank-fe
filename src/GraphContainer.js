import React, { useState, useEffect } from "react";
import "./App.scss";
import "./index.css";
import FilterBox from "./Components/FilterBox";
import "react-dropdown/style.css";
import { withRouter, useParams, useHistory } from "react-router-dom";

import Queries2 from "./Components/Queries2";
import useCalendar from "../src/hooks/useCalendar";
import styled from "styled-components";
import swal from "sweetalert";
import ClipboardJS from "clipboard";

import { Footer } from "./Components/Footer";

const GraphContainer = props => {
  const [url, setUrl] = useState("");
  const [filters, setFilters] = useState(props.filters);

  const {
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate,
    changeYear,
    changeQuarter,
    getCurrentYear
  } = useCalendar();

  const [hidden, setHidden] = useState(false);

  const [open, setOpen] = useState("bar");

  function HideFilters() {
    setHidden(!hidden);
  }

  const clipboard = new ClipboardJS(".btn", {
    text: function() {
      return document.location.href;
    }
  });
  clipboard.on("success", function(e) {
    swal({ title: "", text: "copied url!", icon: "success" });
  });
  // ?filter0equalscommoditycatcommaundefinedzazfilter1equalsundefinedcommaundefinedzazfilter2equalscrossing_freqcommaWeeklyzazfilter3equalscountry_of_residencecommaKENzazfilter4equalsundefinedcommaundefined
  return (
    <div className="App">
      <div className="main-container">
        <div className="main-header">
          <div className="header">
            <h1>Informal Cross-Border Trade Data</h1>
          </div>
          <div className="data-header">
            {/* <p>Data Set | Placeholder | For Active Data Filters</p> */}
          </div>
        </div>
        <div className="content-container">
          <ContentContainerDiv
            className={hidden ? "extend" : "chart-container"}
          >
            <Queries2
              filters={filters}
              filterBoxStartDate={filterBoxStartDate}
              setFilterBoxStartDate={setFilterBoxStartDate}
              filterBoxEndDate={filterBoxEndDate}
              setFilterBoxEndDate={setFilterBoxEndDate}
              open={open}
              setOpen={setOpen}
            />
          </ContentContainerDiv>
          <SocialMediaContainer className="social-media-container">
            <FilterHideButton onClick={HideFilters}>
              {hidden ? <p>►</p> : <p>◄</p>}
            </FilterHideButton>
          </SocialMediaContainer>
          <div
            className={
              hidden ? "dropdown-container hide" : "dropdown-container"
            }
          >
            <FilterBox
              filters={filters}
              setFilters={setFilters}
              filterBoxStartDate={filterBoxStartDate}
              setFilterBoxStartDate={setFilterBoxStartDate}
              filterBoxEndDate={filterBoxEndDate}
              setFilterBoxEndDate={setFilterBoxEndDate}
              changeYear={changeYear}
              changeQuarter={changeQuarter}
              getCurrentYear={getCurrentYear}
              open={open}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GraphContainer;

const FilterHideButton = styled.button`
  padding: 3.5px 5px;
  background: #2c2e32;
  font-weight: 400;
  color: #ffffff;
  border-radius: 5px;
  font-size: 1.4rem;
  height: 30px;
  opacity: 0.75;
  border: none;
  position: absolute;
  &: hover {
    cursor: pointer;
    opacity: 1;
  }
  p {
    height: 24px;
  }
`;
const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-right: 1px;
  padding: 5px;
  margin-bottom: 5px;
`;
const SocialMediaIconsTwitter = styled.a`
  font-size: 2.5rem;
  margin: 0 10px;
  color: rgb(0, 172, 238);
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }
`;
const SocialMediaIconsFacebook = styled.a`
  font-size: 2.5rem;
  margin: 0 10px;
  color: rgb(59, 89, 152);
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }
`;

const ContentContainerDiv = styled.div`
  // border-right: 1px solid lightgrey;
  margin-right: 2px;
`;
