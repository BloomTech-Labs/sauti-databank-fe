import React, { useState, useRef, useEffect } from "react";
import graphLabels from "../graphLabels";

import RenderCheckContainer from "./RenderCheckContainer";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const AddFilter = ({
  filters,
  setFilters,
  index,
  FilterBoxOptions,
  CategoryOptions,
  setUpdateUrlFlag,
  updateUrlFlag,
  displayDrop,
  setDisplayDrop
}) => {
  const [displayRenderContainer, setDisplayRenderContainer] = useState("");
  console.log(displayRenderContainer);
  const classes = useStyles();
  //onmouseOver change
  const changeOption = e => {
    console.log("changeOption");
    console.log(`AddFilter`, e.target.value);
    const display = e.target.value;
    setDisplayRenderContainer(display);
    setUpdateUrlFlag(!updateUrlFlag);
    let optionFlags = {};
    graphLabels[
      `${FilterBoxOptions.default[e.target.value].value.type}`
    ].labels.forEach(option => {
      optionFlags = {
        ...optionFlags,
        [option]: false
      };
    });
    setFilters({
      ...filters,
      [index]: {
        ...filters[index],
        selectedCategory: e.target.value, //option
        selectedTableColumnName:
          FilterBoxOptions.default[e.target.value].value.type,

        selectedTable: FilterBoxOptions.default[e.target.value].value.query,
        selectedOption: undefined,
        selectableOptions: { ...optionFlags },
        showOptions: true
      }
    });
  };

  let allSelectableOptions = Object.keys(FilterBoxOptions.default);
  allSelectableOptions.unshift("KEY DEMOGRAPHICS");

  const allItems = [];
  for (let key in FilterBoxOptions.default) {
    allItems.push([key, FilterBoxOptions.default[key].value.type]);
  }

  function closeDiv() {
    setDisplayDrop(false);
  }

  const displayDropOptions = () => {
    if (displayDrop === true) {
      return (
        <Grid container xs={12} onClick={() => setDisplayDrop(false)}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 345 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="344"
              height="47.0208"
              fill="#F5F5F5"
              stroke="#F5F5F5"
            />
            <g clip-path="url(#clip0)">
              <path
                d="M29.5859 18.4844V20.5234H26.1406V30H23.7188V20.5234H20.2578V18.4844H29.5859ZM32.8281 20.4688H30.5703V18.4141H32.8281V20.4688ZM30.5703 21.4844H32.8281V30H30.5703V21.4844ZM34.1172 23.1484V21.5625H35.3047V19.1875H37.5078V21.5625H38.8906V23.1484H37.5078V27.6484C37.5078 27.9974 37.5521 28.2161 37.6406 28.3047C37.7292 28.388 38 28.4297 38.4531 28.4297C38.5208 28.4297 38.5911 28.4297 38.6641 28.4297C38.7422 28.4245 38.8177 28.4193 38.8906 28.4141V30.0781L37.8359 30.1172C36.7839 30.1536 36.0651 29.9714 35.6797 29.5703C35.4297 29.3151 35.3047 28.9219 35.3047 28.3906V23.1484H34.1172ZM42.5938 30H40.3672V18.4844H42.5938V30ZM48.1328 23.0938C47.6172 23.0938 47.2161 23.2552 46.9297 23.5781C46.6484 23.901 46.4714 24.3385 46.3984 24.8906H49.8594C49.8229 24.3021 49.6432 23.8568 49.3203 23.5547C49.0026 23.2474 48.6068 23.0938 48.1328 23.0938ZM48.1328 21.2578C48.8411 21.2578 49.4792 21.3906 50.0469 21.6562C50.6146 21.9219 51.0833 22.3411 51.4531 22.9141C51.7865 23.4193 52.0026 24.0052 52.1016 24.6719C52.1589 25.0625 52.1823 25.625 52.1719 26.3594H46.3438C46.375 27.2135 46.6432 27.8125 47.1484 28.1562C47.4557 28.3698 47.8255 28.4766 48.2578 28.4766C48.7161 28.4766 49.0885 28.3464 49.375 28.0859C49.5312 27.9453 49.6693 27.75 49.7891 27.5H52.0625C52.0052 28.0052 51.7422 28.5182 51.2734 29.0391C50.5443 29.8672 49.5234 30.2812 48.2109 30.2812C47.1276 30.2812 46.1719 29.9323 45.3438 29.2344C44.5156 28.5365 44.1016 27.401 44.1016 25.8281C44.1016 24.3542 44.474 23.224 45.2188 22.4375C45.9688 21.651 46.9401 21.2578 48.1328 21.2578Z"
                fill="#262626"
              />
            </g>
            <line
              y1="47.7709"
              x2="346"
              y2="47.7709"
              stroke="#BFBFBF"
              stroke-width="0.5"
            />
            <path
              d="M320.002 17.5245H320.998C321.087 17.5245 321.131 17.5688 321.131 17.6574V29.35C321.131 29.4386 321.087 29.4829 320.998 29.4829H320.002C319.913 29.4829 319.869 29.4386 319.869 29.35V17.6574C319.869 17.5688 319.913 17.5245 320.002 17.5245Z"
              fill="#262626"
            />
            <path
              d="M314.922 22.8726H326.078C326.167 22.8726 326.211 22.9168 326.211 23.0054V24.002C326.211 24.0905 326.167 24.1348 326.078 24.1348H314.922C314.833 24.1348 314.789 24.0905 314.789 24.002V23.0054C314.789 22.9168 314.833 22.8726 314.922 22.8726Z"
              fill="#262626"
            />
            <defs>
              <clipPath id="clip0">
                <rect
                  width="100"
                  height="100"
                  fill="white"
                  transform="translate(20 12)"
                />
              </clipPath>
            </defs>
          </svg>

          <Grid container xs={12} style={{ flexDirection: "column" }}>
            {allItems.map(e => {
              return (
                <>
                  <TextField
                    // className={classes.supercat}
                    value={e[0]}
                    onClick={changeOption}
                    key={e[0]}
                  >
                    {e[0]}
                  </TextField>

                  <RenderCheckContainer
                    i={index}
                    itemName={e[0]}
                    filters={filters}
                    graphLabels={graphLabels}
                    setFilters={setFilters}
                    setUpdateUrlFlag={setUpdateUrlFlag}
                    updateUrlFlag={updateUrlFlag}
                    FilterBoxOptions={FilterBoxOptions}
                  />
                </>
              );
            })}
          </Grid>
        </Grid>
      );
    } else {
      return (
        <>
          <Grid container xs={12}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 345 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="100%"
                height="100%"
                fill="#F5F5F5"
                stroke="#F5F5F5"
              />
              <g clip-path="url(#clip0)">
                <path
                  d="M29.5859 18.4844V20.5234H26.1406V30H23.7188V20.5234H20.2578V18.4844H29.5859ZM32.8281 20.4688H30.5703V18.4141H32.8281V20.4688ZM30.5703 21.4844H32.8281V30H30.5703V21.4844ZM34.1172 23.1484V21.5625H35.3047V19.1875H37.5078V21.5625H38.8906V23.1484H37.5078V27.6484C37.5078 27.9974 37.5521 28.2161 37.6406 28.3047C37.7292 28.388 38 28.4297 38.4531 28.4297C38.5208 28.4297 38.5911 28.4297 38.6641 28.4297C38.7422 28.4245 38.8177 28.4193 38.8906 28.4141V30.0781L37.8359 30.1172C36.7839 30.1536 36.0651 29.9714 35.6797 29.5703C35.4297 29.3151 35.3047 28.9219 35.3047 28.3906V23.1484H34.1172ZM42.5938 30H40.3672V18.4844H42.5938V30ZM48.1328 23.0938C47.6172 23.0938 47.2161 23.2552 46.9297 23.5781C46.6484 23.901 46.4714 24.3385 46.3984 24.8906H49.8594C49.8229 24.3021 49.6432 23.8568 49.3203 23.5547C49.0026 23.2474 48.6068 23.0938 48.1328 23.0938ZM48.1328 21.2578C48.8411 21.2578 49.4792 21.3906 50.0469 21.6562C50.6146 21.9219 51.0833 22.3411 51.4531 22.9141C51.7865 23.4193 52.0026 24.0052 52.1016 24.6719C52.1589 25.0625 52.1823 25.625 52.1719 26.3594H46.3438C46.375 27.2135 46.6432 27.8125 47.1484 28.1562C47.4557 28.3698 47.8255 28.4766 48.2578 28.4766C48.7161 28.4766 49.0885 28.3464 49.375 28.0859C49.5312 27.9453 49.6693 27.75 49.7891 27.5H52.0625C52.0052 28.0052 51.7422 28.5182 51.2734 29.0391C50.5443 29.8672 49.5234 30.2812 48.2109 30.2812C47.1276 30.2812 46.1719 29.9323 45.3438 29.2344C44.5156 28.5365 44.1016 27.401 44.1016 25.8281C44.1016 24.3542 44.474 23.224 45.2188 22.4375C45.9688 21.651 46.9401 21.2578 48.1328 21.2578Z"
                  fill="#262626"
                />
              </g>
              <path
                d="M324.812 21H323.641C323.561 21 323.486 21.0391 323.439 21.1031L319 27.2219L314.561 21.1031C314.514 21.0391 314.439 21 314.359 21H313.187C313.086 21 313.027 21.1156 313.086 21.1984L318.595 28.7937C318.795 29.0687 319.205 29.0687 319.403 28.7937L324.912 21.1984C324.973 21.1156 324.914 21 324.812 21Z"
                fill="#8C8C8C"
              />
              <defs>
                <clipPath id="clip0">
                  <rect
                    width="100"
                    height="100"
                    fill="white"
                    transform="translate(20 12)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Grid>
        </>
      );
    }
  };
  return <div onClick={() => setDisplayDrop(true)}>{displayDropOptions()}</div>;
};

export default AddFilter;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  supercat: {
    padding: theme.spacing(0.2),
    opacity: 1,
    fontSize: "1.5rem",
    textOverflow: "ellipsis",
    height: "20px",
    fontFamily: "sans-serif",
    "&:hover, &:focus": {
      background: "rgba(0, 0, 0, 0.5)",
      opacity: 1
    }
  }
}));
