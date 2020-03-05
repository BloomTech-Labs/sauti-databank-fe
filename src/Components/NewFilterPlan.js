import React, { useState } from "react";
import { SignUpText } from "../dashboard/styledComponents/Index";

// have a js object holding some components in a tree form
// have a single component controlling the nesting
export const Selectable = props => {
  const [selectedSearchString, setSelectedSearchString] = useState("");
  // have the prompt be selectable using a checkbox styled form
  // form with checkbox
  // the text
  const setPrompt = e => {
    e.preventDefault();
    // console.log(props.prompt, "was selected")
  };
  const setx = e => {
    e.preventDefault();
    console.log(props.prompt, "was selected");
  };
  console.log(props.prompt);
  return (
    <div>
      <div>
        <form
          onSubmit={e => {
            setPrompt(e);
          }}
        >
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
            onChange={e => {
              setx(e);
            }}
          />
        </form>
      </div>
      {props.prompt + " " + props.function}
    </div>
  );
};
// gender(l1)
// 	[x]femail
// 	country(l2)
// 		[x]kenya
// 		[x]uganda

// 		trade(l3) limit to 4 or 5 items
// 			[x]tradeItem1
// 			[x] tradeItem2

// each round take the first one out and only show the remaining ones (done)
const Node = props => {
  // console.log("props", props);

  // this can be used for show/hide later on
  // const [isSelected, setIsSelected] = useState(false);
  const { prompt, ...rest } = props.currentCategory;
  const { subcategories, ...rest2 } = props;
  const [subcategoriesToDisplay, setSubcategoriesToDisplay] = useState([]);
  const [
    remainingCategoriesToDisplay,
    setRemainingCategoriesToDisplay
  ] = useState([]);
  const remainingCategories = props.categories.filter(
    category => category.prompt !== prompt
  );
  // console.log("prompt", prompt);
  // console.log("choices", subcategories);
  // console.log("remaining categories", remainingCategories);
  // console.log("\n");

  // the Node component calls itself if there are children
  const getTheCategories = () => {
    // setIsSelected(true); this can be used for show/hide later on
    if (subcategories.length > 0) {
      // console.log("next ones", subcategories, remainingCategories);
      setSubcategoriesToDisplay(
        subcategories.map((subcategory, i) => {
          // console.log(subcategory.prompt)
          return <li key={i}>{subcategory.prompt}</li>;
        })
      );
    }
    if (remainingCategories.length > 0) {
      setRemainingCategoriesToDisplay(
        remainingCategories.map((remainingCategory, i) => {
          return (
            <Node
              key={i}
              currentCategory={remainingCategory}
              subcategories={remainingCategory.subcategories}
              categories={remainingCategories}
            />
          );
        })
      );
    }
  };
  return (
    <div>
      <li
        onClick={() => {
          getTheCategories();
        }}
      >
        {/* smallest case */}
        {/* <div>{props.currentCategory.prompt + " AND"}</div> */}
        {prompt}

        {/* subproblems */}
        <ul>{subcategoriesToDisplay}</ul>
        <ul>{remainingCategoriesToDisplay}</ul>
      </li>
    </div>
  );
};

export const Organization = props => {
  // loop through the persons array and create a new component for each, passing the current person (id and name) and it's children (person.people) as props
  const [categories, setCategories] = useState(props.categories);

  /*
    category0
        subs
        category1
    */
  return (
    <div>
      <ul className="org">
        {/* when each of these gets fired off, the lower options need to already be ready
                and the next categories need to already be ready */}
        {categories.map((category, i) => {
          return (
            <Node
              key={i}
              currentCategory={category}
              subcategories={category.subcategories}
              categories={categories}
              setCategories={setCategories}
            />
          );
        })}
      </ul>
    </div>
  );
};
