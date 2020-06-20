import React, { useState, useEffect, useCallback } from "react";

import { FilterBoxOptions } from "../FilterBoxOptions";
import graphLabels from "../graphLabels";
import { colourOptions, groupedOptions } from "../docs/data";
import useCalendar, { getTodaysDate } from "../../hooks/useCalendar";
import { useHistory } from "react-router-dom";

//import CalendarModal from "../dashboard/CalendarModal";
import {
  decodeToken,
  getToken,
  getSubscription
} from "../../dashboard/auth/Auth";
import { getAvaliableOptions, getSelectedOption } from "../../OptionFunctions";
import CalendarParent from "../../dashboard/CalendarParent";

import Grid from "@material-ui/core/Grid";

import DataSeriesFilter from "./DataSeriesFilter";
import DataSFilter from "./DataSFilter";
import AddFilter from "./AddFilter";

import { useDispatch } from "react-redux";
import { compareSubSamples } from "../redux-actions/compareSubSamples";
import { calendarAction } from "../redux-actions/calendarAction";
import { clearFiltersAction } from "../redux-actions/clearFiltersAction";

export default function FilterBox(props) {
  const History = useHistory();
  const {
    filters,
    setFilters,
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate,
    changeYear,
    changeQuarter,
    getCurrentYear,
    open
  } = props;
  const [updateUrlFlag, setUpdateUrlFlag] = useState(false);
  const [displayDrop, setDisplayDrop] = useState([]);

  //theSuperCategories (Key Demographic, Information Demand, Business Behavior)
  //categoriesCollected (categories selected ex. 'gender')
  const xVar = (theSuperCategories, categoriesCollected) => {
    return theSuperCategories.map(superCategory => {
      return {
        label: superCategory.label,
        options: superCategory.options
          //  filters out the already selected option
          .map(category => {
            return {
              label: !categoriesCollected.includes(category.label)
                ? category.label
                : undefined
            };
          })
          .filter(category => category.label !== undefined)
      };
    });
  };

  const dataFilterVar = (theSuperCategories, categoriesCollected) => {
    return theSuperCategories.map(superCategory => {
      return {
        label: superCategory.label,
        options: superCategory.options
      };
    });
  };

  const FilterSelector = props => {
    const {
      filterSelectorName,
      filters,
      setFilters,
      i,

      graphLabels
    } = props;

    let index = i;

    const dispatch = useDispatch();

    useEffect(() => {
      if (filterSelectorName === "Compare SubSamples") {
        dispatch(
          compareSubSamples({
            filterSelectorName: filterSelectorName,
            filters: filters,
            setFilters: setFilters,
            index: index,

            setUpdateUrlFlag: setUpdateUrlFlag,
            FilterBoxOptions: FilterBoxOptions,
            updateUrlFlag: updateUrlFlag,
            xVar: xVar,

            open: open,
            filterSelectorName: filterSelectorName
          })
        );
      }
    }, [open, filters]);

    //first is 'Data Series'
    if (filterSelectorName === "Data Series") {
      return (
        <Grid container>
          <DataSFilter
            filterSelectorName={filterSelectorName}
            filters={filters}
            setFilters={setFilters}
            index={index}
            setUpdateUrlFlag={setUpdateUrlFlag}
            FilterBoxOptions={FilterBoxOptions}
            updateUrlFlag={updateUrlFlag}
            xVar={xVar}
          />
        </Grid>
      );
    } else if (filterSelectorName === "Data Filter") {
      return (
        <Grid container>
          <AddFilter
            filterSelectorName={filterSelectorName}
            filters={filters}
            setFilters={setFilters}
            index={index}
            setUpdateUrlFlag={setUpdateUrlFlag}
            FilterBoxOptions={FilterBoxOptions}
            updateUrlFlag={updateUrlFlag}
            dataFilterVar={dataFilterVar}
            displayDrop={displayDrop}
            setDisplayDrop={setDisplayDrop}
          />
        </Grid>
      );
    } else {
      return <></>;
    }
  };

  const token = getToken();
  let tier;
  if (token) {
    tier = decodeToken(token);
    tier = tier.tier;
  }
  const newSub = getSubscription();
  let sub;
  if (newSub) {
    sub = newSub;
  }

  const [setup, setSetup] = useState(colourOptions[0]);
  const [loading, setLoading] = useState(false);

  let urlSearchParams = {};
  Object.keys(filters).forEach(filterId => {
    urlSearchParams = {
      ...urlSearchParams,
      ["filter" + String(filterId)]: `${
        filters[filterId].selectedTableColumnName
          ? filters[filterId].selectedTableColumnName
          : "undefined"
      }comma${getSelectedOption(filters, filterId)}`
    };
  });

  //let ourSearch = useHistory().location.search;
  const inverseConvertOptionUrl = option => {
    // these come from the selection options the user will see
    // -1 means the search failed
    if (option.search(/\//) > -1) {
      return option.replace(/\//g, "forwardslash");
    } else if (option.search(/ /) > -1) {
      return option.replace(/ /g, "whitespace");
    } else {
      return option;
    }
  };
  useEffect(() => {
    let keys = Object.keys(urlSearchParams);
    let values = Object.values(urlSearchParams).map(value =>
      inverseConvertOptionUrl(value)
    );

    const filterStrings = keys
      .map((key, i) => key + "equals" + values[i])
      .join("zaz");

    History.push("?" + filterStrings); //new URLSearchParams({ ...urlSearchParams }).toString());
  }, [updateUrlFlag]);

  const handleSubmit = useCallback(
    e => {
      if (e.target.textContent === "Submit") {
        e.preventDefault();
      }

      setFilterBoxStartDate(filterBoxStartDate);
      setFilterBoxEndDate(filterBoxEndDate);
    },
    [
      filterBoxEndDate,

      filterBoxStartDate,
      setFilterBoxStartDate,
      setFilterBoxEndDate
    ]
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      calendarAction({
        tier: tier,
        newSub: newSub,
        filterBoxStartDate: filterBoxStartDate,
        setFilterBoxStartDate: setFilterBoxStartDate,
        filterBoxEndDate: filterBoxEndDate,
        setFilterBoxEndDate: setFilterBoxEndDate,
        changeYear: changeYear,
        changeQuarter: changeQuarter,
        getCurrentYear: getCurrentYear,
        changeYear: changeYear,
        changeQuarter: changeQuarter,
        getCurrentYear: getCurrentYear,
        loading: loading,
        open: props.open
      })
    );
    dispatch(
      clearFiltersAction({
        setFilters: setFilters,
        setFilterBoxStartDate: setFilterBoxStartDate,
        setFilterBoxEndDate: setFilterBoxEndDate,
        setUpdateUrlFlag: setUpdateUrlFlag,
        filters: filters,
        getTodaysDate: getTodaysDate,
        updateUrlFlag: updateUrlFlag
      })
    );
  }, [open, filters]);

  return (
    <>
      <Grid container>
        {Object.keys(filters).map(filterId => (
          <FilterSelector
            key={filterId}
            filterSelectorName={filters[filterId].nameOfFilter}
            filters={filters}
            setFilters={setFilters}
            i={filterId}
            graphLabels={graphLabels}
          />
        ))}

        <svg
          onClick={e => {
            const currentDataFilter = Object.keys(filters).length - 1;

            if (
              tier !== undefined &&
              (tier === "ADMIN" || tier === "PAID" || tier === "GOV_ROLE")
            ) {
              setFilters({
                ...filters,
                // make a flag that is only true when this button is clicked on
                // put the flag on the last additional filter known to the user
                [currentDataFilter]: {
                  ...filters[currentDataFilter],
                  // set to true only if selectableOptions has a selected item
                  // (the only time optionHasBeenSelected will be true)
                  showOptions: false
                },
                [Object.keys(filters).length]: {
                  nameOfFilter: "Data Filter",
                  selectedCategory: "",
                  selectableOptions: {},
                  selectedTable: "",
                  selectedTableColumnName: "",
                  showOptions: true
                }
              });
            }
          }}
          style={{ cursor: loading ? "auto" : "pointer" }}
          width="346"
          height="49"
          viewBox="0 0 346 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="1" width="345" height="48.0208" fill="white" />
          <g clip-path="url(#clip0)">
            <path
              d="M28.1094 25.2969L26.3672 20.2266L24.5156 25.2969H28.1094ZM25.5547 18.5234H27.3125L31.4766 30H29.7734L28.6094 26.5625H24.0703L22.8281 30H21.2344L25.5547 18.5234ZM33.5938 25.9141C33.5938 26.8099 33.7839 27.5599 34.1641 28.1641C34.5443 28.7682 35.1536 29.0703 35.9922 29.0703C36.6432 29.0703 37.1771 28.7917 37.5938 28.2344C38.0156 27.6719 38.2266 26.8672 38.2266 25.8203C38.2266 24.763 38.0104 23.9818 37.5781 23.4766C37.1458 22.9661 36.612 22.7109 35.9766 22.7109C35.2682 22.7109 34.6927 22.9818 34.25 23.5234C33.8125 24.0651 33.5938 24.862 33.5938 25.9141ZM35.7109 21.4844C36.3516 21.4844 36.888 21.6198 37.3203 21.8906C37.5703 22.0469 37.8542 22.3203 38.1719 22.7109V18.4844H39.5234V30H38.2578V28.8359C37.9297 29.3516 37.5417 29.724 37.0938 29.9531C36.6458 30.1823 36.1328 30.2969 35.5547 30.2969C34.6224 30.2969 33.8151 29.9062 33.1328 29.125C32.4505 28.3385 32.1094 27.2943 32.1094 25.9922C32.1094 24.7734 32.4193 23.7188 33.0391 22.8281C33.6641 21.9323 34.5547 21.4844 35.7109 21.4844ZM42.5 25.9141C42.5 26.8099 42.6901 27.5599 43.0703 28.1641C43.4505 28.7682 44.0599 29.0703 44.8984 29.0703C45.5495 29.0703 46.0833 28.7917 46.5 28.2344C46.9219 27.6719 47.1328 26.8672 47.1328 25.8203C47.1328 24.763 46.9167 23.9818 46.4844 23.4766C46.0521 22.9661 45.5182 22.7109 44.8828 22.7109C44.1745 22.7109 43.599 22.9818 43.1562 23.5234C42.7188 24.0651 42.5 24.862 42.5 25.9141ZM44.6172 21.4844C45.2578 21.4844 45.7943 21.6198 46.2266 21.8906C46.4766 22.0469 46.7604 22.3203 47.0781 22.7109V18.4844H48.4297V30H47.1641V28.8359C46.8359 29.3516 46.4479 29.724 46 29.9531C45.5521 30.1823 45.0391 30.2969 44.4609 30.2969C43.5286 30.2969 42.7214 29.9062 42.0391 29.125C41.3568 28.3385 41.0156 27.2943 41.0156 25.9922C41.0156 24.7734 41.3255 23.7188 41.9453 22.8281C42.5703 21.9323 43.4609 21.4844 44.6172 21.4844ZM55.3203 20.3594C55.3411 19.776 55.4427 19.349 55.625 19.0781C55.9531 18.599 56.5859 18.3594 57.5234 18.3594C57.612 18.3594 57.7031 18.362 57.7969 18.3672C57.8906 18.3724 57.9974 18.3802 58.1172 18.3906V19.6719C57.9714 19.6615 57.8646 19.6562 57.7969 19.6562C57.7344 19.651 57.6745 19.6484 57.6172 19.6484C57.1901 19.6484 56.9349 19.7604 56.8516 19.9844C56.7682 20.2031 56.7266 20.7656 56.7266 21.6719H58.1172V22.7812H56.7109V30H55.3203V22.7812H54.1562V21.6719H55.3203V20.3594ZM59.4688 20.1172V18.5234H60.875V20.1172H59.4688ZM59.4688 21.6719H60.875V30H59.4688V21.6719ZM63.0078 18.5234H64.4141V30H63.0078V18.5234ZM66.8125 19.2969H68.2344V21.6328H69.5703V22.7812H68.2344V28.2422C68.2344 28.5339 68.3333 28.7292 68.5312 28.8281C68.6406 28.8854 68.8229 28.9141 69.0781 28.9141C69.1458 28.9141 69.2188 28.9141 69.2969 28.9141C69.375 28.9089 69.4661 28.901 69.5703 28.8906V30C69.4089 30.0469 69.2396 30.0807 69.0625 30.1016C68.8906 30.1224 68.7031 30.1328 68.5 30.1328C67.8438 30.1328 67.3984 29.9661 67.1641 29.6328C66.9297 29.2943 66.8125 28.8568 66.8125 28.3203V22.7812H65.6797V21.6328H66.8125V19.2969ZM74.4688 21.4453C75.0625 21.4453 75.638 21.5859 76.1953 21.8672C76.7526 22.1432 77.1771 22.5026 77.4688 22.9453C77.75 23.3672 77.9375 23.8594 78.0312 24.4219C78.1146 24.8073 78.1562 25.4219 78.1562 26.2656H72.0234C72.0495 27.1146 72.25 27.7969 72.625 28.3125C73 28.8229 73.5807 29.0781 74.3672 29.0781C75.1016 29.0781 75.6875 28.8359 76.125 28.3516C76.375 28.0703 76.5521 27.7448 76.6562 27.375H78.0391C78.0026 27.6823 77.8802 28.026 77.6719 28.4062C77.4688 28.7812 77.2396 29.0885 76.9844 29.3281C76.5573 29.7448 76.0286 30.026 75.3984 30.1719C75.0599 30.2552 74.6771 30.2969 74.25 30.2969C73.2083 30.2969 72.3255 29.9193 71.6016 29.1641C70.8776 28.4036 70.5156 27.3411 70.5156 25.9766C70.5156 24.6328 70.8802 23.5417 71.6094 22.7031C72.3385 21.8646 73.2917 21.4453 74.4688 21.4453ZM76.7109 25.1484C76.6536 24.5391 76.5208 24.0521 76.3125 23.6875C75.9271 23.0104 75.2839 22.6719 74.3828 22.6719C73.737 22.6719 73.1953 22.9062 72.7578 23.375C72.3203 23.8385 72.0885 24.4297 72.0625 25.1484H76.7109ZM79.9297 21.6328H81.2656V23.0781C81.375 22.7969 81.6432 22.4557 82.0703 22.0547C82.4974 21.6484 82.9896 21.4453 83.5469 21.4453C83.5729 21.4453 83.6172 21.4479 83.6797 21.4531C83.7422 21.4583 83.849 21.4688 84 21.4844V22.9688C83.9167 22.9531 83.8385 22.9427 83.7656 22.9375C83.6979 22.9323 83.6224 22.9297 83.5391 22.9297C82.8307 22.9297 82.2865 23.1589 81.9062 23.6172C81.526 24.0703 81.3359 24.5938 81.3359 25.1875V30H79.9297V21.6328Z"
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
                width="33"
                height="24"
                fill="white"
                transform="translate(21 12)"
              />
            </clipPath>
          </defs>
        </svg>
      </Grid>
    </>
  );
}
