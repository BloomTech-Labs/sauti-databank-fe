import React, { useState } from "react";

// this is the non-redux global var solution
var orFunction2 = [[], [], []];
var andFunction2 = [];

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
  // It thinks the orFunction is different for each compoment
  const setx = e => {
    e.preventDefault();
    console.log(props.prompt, "was selected");
    // console.log(props.orFunction, props.levelId)
    let {
      orFunction,
      levelId,
      setOrFunction,
      andFunction,
      setAndFunction
    } = props;
    // console.log(...orFunction.slice(0, levelId)[0])
    // console.log([...orFunction.slice(levelId, levelId + 1)[0], props.prompt])
    // console.log([...orFunction.slice(levelId + 1, orFunction.length)[0]])
    if (props.function === "OR") {
      // setOrFunction(
      //     orFunction.map((orGroup, i) => {
      //         if(i === levelId) {
      //             console.log(orGroup)
      //             return [...orGroup, props.prompt]
      //         } else {
      //             return [...orGroup]
      //         }
      //     })
      // )

      orFunction2 = orFunction2.map((orGroup, i) => {
        if (i === levelId) {
          // console.log(orGroup)
          return [...orGroup, props.prompt];
        } else {
          return [...orGroup];
        }
      });
      // console.log(orFunction2)

      // )
    } else if (props.function === "AND") {
      andFunction2 = [...andFunction2, props.prompt];
      // setAndFunction([...andFunction, props.prompt])
    }

    // let result = [
    //     [...orFunction.slice(0, levelId)],
    //     [...orFunction.slice(levelId, levelId + 1), props.prompt],
    //     [...orFunction.slice(levelId + 1, orFunction.length)]
    // ]
    // console.log(orFunction, levelId)

    /*
    selectable shoud know what level it is at
    orFunction = [
        orFunction.slice(0, i),
        [...orFunction.slice(i, i + 1), props.prompt],
        orFunction.slice(i + 1, orFunction.length)
    ]
    */
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
          // OR
          return (
            <li key={i}>
              {/* {subcategory.prompt} */}
              <Selectable
                prompt={subcategory.prompt}
                function={"OR"}
                orFunction={props.orFunction}
                setOrFunction={props.setOrFunction}
                levelId={props.levelId}
                andFunction={props.andFunction}
                setAndFunction={props.setAndFunction}
              />
            </li>
          );
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
              orFunction={props.orFunction}
              setOrFunction={props.setOrFunction}
              levelId={props.levelId + 1}
              andFunction={props.andFunction}
              setAndFunction={props.setAndFunction}
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
        {/* {prompt} */}
        <Selectable
          prompt={prompt}
          function={"AND"}
          orFunction={props.orFunction}
          setOrFunction={props.setOrFunction}
          levelId={props.levelId}
          andFunction={props.andFunction}
          setAndFunction={props.setAndFunction}
        />

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
  const [orFunction, setOrFunction] = useState([[], [], []]);
  const [andFunction, setAndFunction] = useState([]);
  let levelId = 0;
  /*
        category0
            subs
            category1
        */
  // console.log('organization', orFunction2)
  // console.log(andFunction)

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
              orFunction={orFunction}
              setOrFunction={setOrFunction}
              levelId={levelId}
              andFunction={andFunction}
              setAndFunction={setAndFunction}
            />
          );
        })}
        <div
          onClick={() => {
            console.log("organization", orFunction2);
            console.log("organization", andFunction2);
            let query = {};
            andFunction2.forEach((andCol, i) => {
              query = {
                ...query,
                [andCol]: orFunction2[i]
              };
            });
            // We can then send this to whatever we use to handle the query
            // (or) each list inside the col
            // (and) each col
            console.log(query);
          }}
        >
          get current OR
        </div>
      </ul>
    </div>
  );
};
