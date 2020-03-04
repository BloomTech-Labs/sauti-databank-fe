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

var people = [
  {
    id: 1,
    name: "gender",
    people: [
      {
        id: 2,
        name: "male"
      },
      {
        id: 3,
        name: "country",
        people: [
          {
            id: 4,
            name: "Technical Lead",
            people: [
              {
                id: 5,
                name: "Software Developer"
              },
              {
                id: 6,
                name: "Support Technician"
              }
            ]
          }
        ]
      },
      {
        id: 7,
        name: "HR Department",
        people: [
          {
            id: 8,
            name: "HR Officer",
            people: [
              {
                id: 9,
                name: "HR Assistant 1"
              },
              {
                id: 10,
                name: "HR Assistant 2"
              }
            ]
          }
        ]
      }
    ]
  }
];
// each round take the first one out and only show the remaining ones (done)
const Node = props => {
  console.log("props", props);
  //   const [prompt, setPrompt] = useState(props.)
  // const [isSelected, setIsSelected] = useState(false);
  const { prompt, ...rest } = props.currentCategory;
  const { subcategories, ...rest2 } = props;
  const [subcategoriesToDisplay, setSubcategoriesToDisplay] = useState([]);
  const [
    remainingCategoriesToDisplay,
    setRemainingCategoriesToDisplay
  ] = useState([]);
  const remainingCategories = props.categories2.filter(
    category => category.prompt !== prompt
  );
  console.log("prompt", prompt);
  console.log("choices", subcategories);
  console.log("remaining categories", remainingCategories);
  console.log("\n");
  // currentCategory={props.categories2[i]} remainingCategories[i]
  // subcategories={props.categories2[i].subcategories} remainingCategories[i].subcategories

  //   const [prompt, setPrompt] = useState(props.currentCategory.prompt)
  //   const [subcategories, setSubcategories] = useState(props.subcategories);

  //   const [remainingCategories, setRemainingCategories] = useState([]);
  // const count = 0
  let childnodes = null;
  const [childNodes2, setChildNodes2] = useState([]);
  // the Node component calls itself if there are children
  const x = () => {
    // setIsSelected(true);
    if (subcategories.length > 0) {
      //   console.log("we clicked")
      //   console.log(props.categories2)
      //   console.log(props.categories2[0].subcategories)
      console.log("next ones", subcategories, remainingCategories);
      setSubcategoriesToDisplay(
        subcategories.map((subcategory, i) => {
          return <li key={i}>{subcategory.prompt + " OR"}</li>;
        })
      );
      // subcategories.map((subcategory, i) => {
      //     return <li key={i}>{subcategory.prompt + " OR"}</li>;
      //   })
      // subcategories.length != remainingCategories.length
      //   setSubcategoriesToDisplay(subcategories.map((subcategory, i) => {
      //     return (
      //     <Node
      //             key={i}
      //             currentCategory={remainingCategories[i]}
      //             subcategories={remainingCategories[i].subcategories}
      //             // firstOne2={firstCategory}
      //             // rest3={rest2}
      //             // prompt2={firstCategory.prompt}
      //             // subcategories={firstCategory.subcategories}
      //             // categories={rest}
      //             // setCategories={setCategories}
      //             // firstOne={firstOne}
      //             categories2={remainingCategories}
      //             // setCategories2={setSubcategoriesToDisplay}
      //             // count={count + i}
      //         />
      //         )}))
    }
    if (remainingCategories.length > 0) {
      setRemainingCategoriesToDisplay(
        remainingCategories.map((subcategory, i) => {
          return (
            <Node
              key={i}
              currentCategory={remainingCategories[i]}
              subcategories={remainingCategories[i].subcategories}
              // firstOne2={firstCategory}
              // rest3={rest2}
              // prompt2={firstCategory.prompt}
              // subcategories={firstCategory.subcategories}
              // categories={rest}
              // setCategories={setCategories}
              // firstOne={firstOne}
              categories2={remainingCategories}
              // setCategories2={setSubcategoriesToDisplay}
              // count={count + i}
            />
          );
        })
      );
    }
  };
  const f = () => {
    // if we have subcategories to fill
    // if(subcategoriesToDisplay.length > 0) {
    //     subcategoriesToDisplay.map(
    //     )
    // <Node
    //             key={i}
    //             currentCategory={props.categories2[i]}
    //             subcategories={props.categories2[i].subcategories}
    //             // firstOne2={firstCategory}
    //             // rest3={rest2}
    //             // prompt2={firstCategory.prompt}
    //             // subcategories={firstCategory.subcategories}
    //             // categories={rest}
    //             // setCategories={setCategories}
    //             // firstOne={firstOne}
    //             // categories2={categories2}
    //             // setCategories2={setCategories2}
    //             // count={count + i}
    //         />
    // }
    // if we have remaining categories to fill
    // if(remainingCategories.length > 0) {
    // }
    // sort of holding both containers (suboptions, and the catagroies)
    // hostage unless there is another level to go down
    // console.log("f was called", props.categories2)
    // if (props.categories2.length > 0) {
    // if(isSelected) {
    //   console.log("got here");
    //   const [firstOne, ...rest] = props.categories;
    // console.log(firstOne)
    //   console.log(props.categories2);
    //   const [firstOne2, ...rest2] = props.categories2;
    //   console.log("first one 2", props.firstOne2);
    // setSubcategories()
    // can't use rerender triggers unless its directly coming from a button
    //   setSubcategories(props.firstOne2.subcategories);
    //   console.log(subcategories);
    // console.log("children", props.children)
    // childnodes = props.categories2.map((childnode, i) => {
    //   setChildNodes2(
    //     props.categories2.map((childnode, i) => {
    //       // console.log(count + i)
    //       return (
    //         <Node
    //           key={i}
    //         //   categories={rest}
    //         //   setCategories={props.setCategories}
    //         //   firstOne={firstOne}
    //           categories2={rest2}
    //           setCategories2={props.setCategories2}
    //           firstOne2={firstOne2}
    //           // count={props.count + i}
    //         />
    //       );
    //     })
    //   );
    // }
    // }
  };

  // return our list element
  // display children if there are any
  //   console.log("sub", subcategories);
  // return (
  //     <div></div>
  // )
  return (
    <div>
      {/* // <li key={props.count}> */}
      <li>
        {/* on prompt click display the suboptions for the category and the remaining categories they can choose */}
        {/* smallest case */}
        <span
          onClick={() => {
            x();
          }}
        >
          {/* the moment this line runs(it appeared to be trying to use something that couldn't have been set yet
            and that's why it fired another render call) it does another call */}
          {JSON.stringify(props.currentCategory.prompt) + " AND"}
        </span>
        {/* <span
        onClick={() => {
          console.log("i was clicked");
        //   setIsSelected(true);

        //   f();
        }}
      >
        {props.firstOne2.prompt + " AND"}
      </span> */}
        {/* only load the next set if we have selected and the length > 0 */}
        {/* {x()} */}
        <ul>{subcategoriesToDisplay}</ul>
        <ul>{remainingCategoriesToDisplay}</ul>

        {/* {subcategoriesToDisplay.length > 0?
      // infinite call stack
        subcategoriesToDisplay.map((subcategory, i) => {
            // return (
            // <Node
            //         key={i}
            //         currentCategory={props.categories2[i]}
            //         subcategories={props.categories2[i].subcategories}
            //         // firstOne2={firstCategory}
            //         // rest3={rest2}
            //         // prompt2={firstCategory.prompt}
            //         // subcategories={firstCategory.subcategories}
            //         // categories={rest}
            //         // setCategories={setCategories}
            //         // firstOne={firstOne}
            //         categories2={props.categories2}
            //         setCategories2={props.setCategories2}
            //         // count={count + i}
            //     />
                // )
        })
        :
            []
      }} */}
        {/* subproblem case1 */}
        {/* subcategories are male, female */}
        {/* {subcategories.length > 0 ? (
        // only want to display this if the user clicks the prompt
        <ul>
          {subcategories.map((subcategory, i) => {
            return <li key={i}>{subcategory.prompt + " OR"}</li>;
          })}
        </ul>
      ) : (
        []
      )} */}

        {/* subproblem case1 */}

        {/* {   childnodes ?
            <ul>{childnodes}</ul>:
            null } */}
        {/* {console.log(childNodes2)} */}
        {/* childNodes2 are components with prompt as country, income, education */}
        {/* {childNodes2 ? <ul>{childNodes2}</ul> : []} */}
      </li>
    </div>
  );
};

export const Organisation = props => {
  // loop through the persons array and create a new component for each, passing the current person (id and name) and it's children (person.people) as props
  const [categories, setCategories] = useState(props.categories);
  const [categories2, setCategories2] = useState(props.categories2);

  const count = 0;
  //   const [firstOne, ...rest] = categories;
  //   const [firstCategory, ...rest2] = categories2;
  // console.log(firstOne)
  console.log("categories2", categories2);

  // not start of recusion pipeline
  /*
    
    should run [f(cat1), f(cat2), f(cat3)]
    */
  //   let nodes = categories2.map((category, i) => {
  //     return (
  //       <Node
  //         key={i}
  //         currentCategory={category}
  //         // prompt2={firstCategory.prompt}
  //         // subcategories={firstCategory.subcategories}
  //         // categories={rest}
  //         // setCategories={setCategories}
  //         // firstOne={firstOne}
  //         categories2={categories2}
  //         setCategories2={setCategories2}
  //         // firstOne2={firstCategory}
  //         // count={count + i}
  //       />
  //     );
  //   });
  /*
category0
    subs
    category1
*/
  return (
    <div>
      <ul className="org">
        {/* {nodes} */}
        {/* when each of these gets fired off, the lower options need to already be ready
          and the next categories need to already be ready */}
        {categories2.map((category, i) => {
          // const firstCategory = props.categories2[i];

          return (
            <Node
              key={i}
              currentCategory={props.categories2[i]}
              subcategories={props.categories2[i].subcategories}
              // firstOne2={firstCategory}
              // rest3={rest2}
              // prompt2={firstCategory.prompt}
              // subcategories={firstCategory.subcategories}
              // categories={rest}
              // setCategories={setCategories}
              // firstOne={firstOne}
              categories2={categories2}
              setCategories2={setCategories2}
              // count={count + i}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const MainSelector = props => {
  const [isSelected, setIsSelected] = useState(false);
  const selectItem = () => {
    if (isSelected) {
      console.log("here");
      setIsSelected(false);
      return (
        <MainSelector>
          <ul>
            <li
              onClick={() => {
                setIsSelected(false);
              }}
            >
              category
            </li>
          </ul>
        </MainSelector>
      );
    } else {
      return (
        <div>
          <p
            onClick={() => {
              setIsSelected(true);
            }}
          >
            category
          </p>
        </div>
      );
    }
  };
  return (
    <div>
      {selectItem()}
      {/* <p>stuff</p> */}
    </div>
  );
};

/*
<l>
    <component></component>

</l>
*/
