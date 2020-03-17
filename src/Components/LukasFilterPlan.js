// Index box exists
// Once clicked on a specific index category, sub-categories popup for picked index.
// This plan makes cross-filtering dynamic

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { LukasOptions } from "./FilterBoxOptions";
import styled from "styled-components";

const Container = styled.div`
  .container {
    height: 30rem;
    font-size: 2rem;
    border: 1px solid black;

    .container-row {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;

      .container-col-active {
        width: 20%;
      }

      .container-col-category {
        width: 40%;
      }

      .container-col-sub-category {
        width: 40%;
      }

      .col {
        border: 1px solid black;
        padding: 1rem;
      }
    }

    .buttonActivated {
      background: green;
    }
  }
`;

const IndexBox = () => {
  //   const handleDestination = () => {
  //     let activeDestination = document.getElementById("active-div");
  //     let categoryButton = document.getElementById("category-button");
  //     activeDestination.appendChild(categoryButton);
  //     categoryButton.classList.add("buttonActivated");
  //   };

  //   const handleReturn = () => {
  //     let categoryButton = document.getElementById("category-button"); // declaring the button
  //     let checkActive = document.getElementsByClassName("buttonActivated"); // getting active button
  //     if (checkActive) {
  //       let returningDestination = document.getElementById("category-div"); // declaring returning destination
  //       categoryButton.classList.remove("buttonActivated"); // removing the className
  //       returningDestination.appendChild(categoryButton); // moving button WITHOUT the class back to its destination
  //     }
  //   };

  //   const handleReturn = () => {
  //     let categoryButton = document.getElementById("category-button");
  //     // let returningDestination = document.getElementById("category-div"); // declaring returning destination
  //     categoryButton.classList.remove("buttonActivated"); // removing the className
  //     // returningDestination.appendChild(categoryButton); // moving button WITHOUT the class back to its destination
  //   };

  const [active, setActive] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  let activeDestination = useRef();
  let categoryButton = useRef();

  console.log(active, "active state");
  console.log(category, "category state", typeof category);
  console.log(subCategory, "subcategory state");

  // Setting up State
  let defaultOptions = LukasOptions.default.map(item => {
    return item;
  });

  // Getting labels
  let getOptionLabels = defaultOptions.map(item => {
    return item.label;
  });

  const handleClick = (e, index) => {
    setCategory(
      prev => prev.filter((_, i) => i !== index),
      console.log(index, "index")
    );
  };

  useEffect(() => {
    setCategory(defaultOptions);
  }, []);

  return (
    <Container>
      <div className="container">
        <div className="container-row">
          <div className="container-col-active col">
            <span>Active</span>
            <div ref={activeDestination}>
              {active.map(item => {
                return <button>{item}</button>;
              })}
            </div>
          </div>
          <div className="container-col-category col">
            <span>Choose a category</span>
            <div ref={categoryButton} id="category-div">
              {getOptionLabels.map((item, index) => {
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={e => handleClick(e, index)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="container-col-sub-category col">
            <span>Choose a sub-category</span>
            <div></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default IndexBox;
