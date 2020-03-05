import React, { useState, useEffect } from "react";
import "./App.scss";
import "./index.css";
import ReactGa from "react-ga";
import Navbar from "./Components/Navbar";
import FilterBox from "./Components/FilterBox";
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";
import Queries from "./Components/Queries";
import { Organization, Selectable } from "./Components/NewFilterPlan";

const GraphContainer = () => {
  const [index, setIndex] = useState({ type: "gender", query: "Users" });
  const [crossFilter, setCrossFilter] = useState({ type: "", query: "Users" });
  const [additionalFilter, setAdditionalFilter] = useState({
    type: "",
    query: "",
    label: ""
  });
  const [indexLabel, setIndexLabel] = useState("Gender");
  const [crossLabel, setCrossLabel] = useState("");
  const [checkboxOptions, setCheckboxOptions] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState({});
  const [startDate, setStartDate] = useState("2012-01-01");
  const [endDate, setEndDate] = useState("2020-01-08");

  // useEffect(() => {
  //   ReactGa.initialize("UA-155468784-1");
  //   //to report specified pageview:
  //   ReactGa.pageview("/");
  // }, []);

  const onChange = event => {
    setIndex(event.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setCrossFilter(e.target.value);
  };
  // <Selectable prompt={""} />
  const categories = [
    {
      prompt: <Selectable prompt={"gender"} function={"AND"} />,
      subcategories: [
        {
          prompt: <Selectable prompt={"male"} function={"OR"} />,
          subcategories: []
        },
        {
          prompt: <Selectable prompt={"female"} function={"OR"} />,
          subcategories: []
        }
      ]
    },
    {
      prompt: <Selectable prompt={"country"} function={"AND"} />,
      subcategories: [
        {
          prompt: <Selectable prompt={"kenya"} function={"OR"} />,
          subcategories: []
        },
        {
          prompt: <Selectable prompt={"zimbabway"} function={"OR"} />,
          subcategories: []
        },
        {
          prompt: <Selectable prompt={"uganda"} function={"OR"} />,
          subcategories: []
        }
      ]
    },
    {
      prompt: <Selectable prompt={"trade"} function={"AND"} />,
      subcategories: [
        {
          prompt: <Selectable prompt={"carrots"} function={"OR"} />,
          subcategories: []
        },
        {
          prompt: <Selectable prompt={"rice"} function={"OR"} />,
          subcategories: []
        },
        {
          prompt: <Selectable prompt={"maize"} function={"OR"} />,
          subcategories: []
        }
      ]
    }
  ];
  return (
    <div className="App">
      <div className="main-container">
        <div className="header">
          <h1>Informal Cross-Border Trade Data</h1>
        </div>
        <Organization categories={categories} />
        {/* <div className="content-container">
          <div className="chart-container">
            <Queries
              index={index}
              crossFilter={crossFilter}
              label={indexLabel}
              crossLabel={crossLabel}
              selectedCheckbox={selectedCheckbox}
              checkboxOptions={checkboxOptions}
              setCheckboxOptions={setCheckboxOptions}
              additionalFilter={additionalFilter}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="dropdown-container">
            <FilterBox
              onChange={onChange}
              onSubmit={onSubmit}
              index={index}
              checkboxOptions={checkboxOptions}
              crossFilter={crossFilter}
              setIndex={setIndex}
              setCrossFilter={setCrossFilter}
              setIndexLabel={setIndexLabel}
              setCrossLabel={setCrossLabel}
              setSelectedCheckbox={setSelectedCheckbox}
              setCheckboxOptions={setCheckboxOptions}
              setAdditionalFilter={setAdditionalFilter}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default withRouter(GraphContainer);
