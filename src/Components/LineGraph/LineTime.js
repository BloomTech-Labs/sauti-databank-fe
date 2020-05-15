import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import CheckBox from "../CheckBox";

import { getHighestSelected } from "../LineGraphHelpers/selectedCheckboxes";

import "../../Components/scss/lineGraph.scss";
import LineRange from "./LineRange";

const GraphTime = ({ month100, quarter100, year100, top7, checkboxes }) => {
  const [time, setTime] = useState([]);
  const [timeInUse, setTimeInUse] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setTime(month100);
    setCheckedItems(top7);
    setTimeInUse(month100);
  }, [month100, top7]);

  let display = [];
  if (checkedItems && Object.entries(checkedItems).length > 0) {
    for (let i = 0; i < Object.entries(checkedItems).length; i++) {
      let bbb = Object.entries(checkedItems)[i];
      if (bbb.includes(true)) {
        display.push(bbb[0]);
      }
    }
  }

  //multiple functions onClick
  function moOnClick(event) {
    setTime(month100);
    setTimeInUse(month100);
  }

  function qtrOnClick(event) {
    setTime(quarter100);
    setTimeInUse(quarter100);
  }

  function yrOnClick(event) {
    setTime(year100);
    setTimeInUse(year100);
  }

  //checkboxs to display individual lines
  function handleChange(event) {
    let selected = event.target.name;
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  }

  // items to display on line chart
  const zero = display[0];
  const one = display[1];
  const two = display[2];
  const three = display[3];
  const four = display[4];
  const five = display[5];
  const six = display[6];
  const seven = display[7];

  let highest = getHighestSelected(time, display);

  //To reset all selected checkboxes
  const handleReset = event => {
    setCheckedItems(checkedItems);
  };
  return (
    <>
      <div className="toggleDateContainer">
        <p
          className={time === month100 ? "monthBtnOn" : "monthBtnOff"}
          onClick={moOnClick}
        >
          {" "}
          Monthly
        </p>
        <p
          className={time === quarter100 ? "monthBtnOn" : "monthBtnOff"}
          onClick={qtrOnClick}
        >
          {" "}
          Quarterly
        </p>
        <p
          className={time === year100 ? "monthBtnOn" : "monthBtnOff"}
          onClick={yrOnClick}
        >
          {" "}
          Yearly
        </p>
      </div>
      <ResponsiveContainer width="95%" height={600}>
        <LineChart
          data={time}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis type="number" domain={[0, highest]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={zero}
            stroke="blue"
            dot={false}
            // activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey={one} stroke="purple" dot={false} />
          <Line type="monotone" dataKey={two} stroke="orange" dot={false} />
          <Line type="monotone" dataKey={three} stroke="green" dot={false} />
          <Line type="monotone" dataKey={four} stroke="red" dot={false} />
          <Line type="monotone" dataKey={five} stroke="tan" dot={false} />
          <Line type="monotone" dataKey={six} stroke="yellow" dot={false} />
          <Line type="monotone" dataKey={seven} stroke="brown" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <button className="buttonReset" onClick={handleReset}>
        Reset
      </button>
      <div className="boxes">
        <React.Fragment>
          {checkboxes.map(option => (
            <label key={option.key}>
              <CheckBox
                name={option.name}
                checked={checkedItems[option.name]}
                handleChange={handleChange}
              />

              {option.name}
            </label>
          ))}
        </React.Fragment>
      </div>
      <LineRange timeInUse={timeInUse} time={time} setTime={setTime} />
    </>
  );
};
export default GraphTime;
