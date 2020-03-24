import React, { useState, useEffect } from "react";
import "./App.scss";
import "./index.css";
import ReactGa from "react-ga";
import Navbar from "./Components/Navbar";
import FilterBox from "./Components/FilterBox";
import "react-dropdown/style.css";
import { withRouter, useParams, useHistory } from "react-router-dom";

import Queries from "./Components/Queries2";
import useCalendar from "../src/hooks/useCalendar";
import styled from "styled-components";
import swal from "sweetalert";
import ClipboardJS from "clipboard";
import graphLabels from "./Components/graphLabels";

import { getAvaliableOptions, getSelectedOption } from "./OptionFunctions";

const GraphContainer = props => {
  const [url, setUrl] = useState("");
  const [filters, setFilters] = useState(props.filters);

  const {
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = useCalendar();

  const [hidden, setHidden] = useState(false);

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

  return (
    <div className="App">
      <div className="main-container">
        <div className="header">
          <h1>Informal Cross-Border Trade Data</h1>
        </div>
        <div className="content-container">
          <ContentContainerDiv
            className={hidden ? "extend" : "chart-container"}
          >
            <SocialMediaContainer className="social-media-container">
              <IconContainer>
                <div>Share:</div>
                <div>
                  <SocialMediaIconsTwitter
                    class="twitter-share-button"
                    target="_blank"
                    href="https://twitter.com/intent/tweet?text=This%20website%20is%20awesome!"
                  >
                    <i class="fab fa-twitter"></i>
                  </SocialMediaIconsTwitter>
                </div>
                <div
                  class="fb-share-button"
                  data-href="https://blissful-pare-60612f.netlify.com/data"
                  data-layout="button"
                  data-size="small"
                >
                  <SocialMediaIconsFacebook
                    target="_blank"
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
                    class="fb-xfbml-parse-ignore"
                  >
                    <i class="fab fa-facebook-square"></i>
                  </SocialMediaIconsFacebook>
                </div>
                <CopyUrlButton className="btn">Copy URL</CopyUrlButton>
              </IconContainer>
              <FilterHideButton onClick={HideFilters}>
                {hidden ? <p>Show Filters</p> : <p>Hide Filters</p>}
              </FilterHideButton>
            </SocialMediaContainer>
            <Queries
              filters={filters}
              filterBoxStartDate={filterBoxStartDate}
              setFilterBoxStartDate={setFilterBoxStartDate}
              filterBoxEndDate={filterBoxEndDate}
              setFilterBoxEndDate={setFilterBoxEndDate}
            />
          </ContentContainerDiv>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(GraphContainer);

const FilterHideButton = styled.button`
  padding: 8px 5px;
  background: #eb5e52;
  font-weight: 400;
  color: white;
  border-radius: 5px;
  font-size: 1.4rem;
  width: 95px;
  opacity: 0.75;
  border: none;
  &: hover {
    cursor: pointer;
    opacity: 1;
  }
`;
const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
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

const CopyUrlButton = styled.button`
  padding: 8px 5px;
  background: #47837f;
  font-weight: 400;
  color: white;
  border-radius: 5px;
  font-size: 1.4rem;
  width: 95px;
  opacity: 0.75;
  border: none;
  margin: 0 15px;
  &: hover {
    cursor: pointer;
    opacity: 1;
  }
`;
const ContentContainerDiv = styled.div`
  border-right: 1px solid lightgrey;
  margin-right: 2px;
`;
const IconContainer = styled.span`
  display: flex;
  font-size: 1.8rem;
  align-items: center;
`;
