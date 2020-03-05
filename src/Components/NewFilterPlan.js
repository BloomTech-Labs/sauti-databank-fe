import React, { useState } from "react";

// have a js object holding some components in a tree form
// have a single component controlling the nesting

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
  //   console.log("props", props);

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
          return <li key={i}>{subcategory.prompt + " OR"}</li>;
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
      <li>
        {/* smallest case */}
        <span
          onClick={() => {
            getTheCategories();
          }}
        >
          {props.currentCategory.prompt + " AND"}
        </span>
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
