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
  console.log("was called", props);
  const [isSelected, setIsSelected] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [remainingCategories, setRemainingCategories] = useState([]);
  // const count = 0
  let childnodes = null;
  const [childNodes2, setChildNodes2] = useState([]);
  // the Node component calls itself if there are children
  const f = () => {
    // console.log(props.categories2)
    if (props.categories2.length > 0) {
      // if(isSelected) {
      console.log("got here");
      const [firstOne, ...rest] = props.categories;
      // console.log(firstOne)
      console.log(props.categories2);
      const [firstOne2, ...rest2] = props.categories2;
      console.log("first one 2", props.firstOne2);
      // setSubcategories()
      // can't use rerender triggers unless its directly coming from a button
      setSubcategories(props.firstOne2.subcategories);
      console.log(subcategories);
      // console.log("children", props.children)
      // childnodes = props.categories2.map((childnode, i) => {
      setChildNodes2(
        props.categories2.map((childnode, i) => {
          // console.log(count + i)

          return (
            <Node
              key={i}
              categories={rest}
              setCategories={props.setCategories}
              firstOne={firstOne}
              categories2={rest2}
              setCategories2={props.setCategories2}
              firstOne2={firstOne2}
              // count={props.count + i}
            />
          );
        })
      );
      // }
    }
  };

  // return our list element
  // display children if there are any
  console.log("sub", subcategories);

  return (
    // <li key={props.count}>
    <li>
      {/* on prompt click display the suboptions for the category and the remaining categories they can choose */}

      <span
        onClick={() => {
          console.log("i was clicked");
          setIsSelected(true);

          f();
        }}
      >
        {props.firstOne2.prompt}
      </span>
      {/* subcategories are male, female */}
      {subcategories.length > 0 ? (
        // only want to display this if the user clicks the prompt
        <ul>
          {subcategories.map((subcategory, i) => {
            return <li key={i}>{subcategory.prompt}</li>;
          })}
        </ul>
      ) : (
        []
      )}

      {/* {   childnodes ?
            <ul>{childnodes}</ul>:
            null } */}
      {/* {console.log(childNodes2)} */}
      {/* childNodes2 are components with prompt as country, income, education */}
      {childNodes2 ? <ul>{childNodes2}</ul> : []}
    </li>
  );
};

export const Organisation = props => {
  // loop through the persons array and create a new component for each, passing the current person (id and name) and it's children (person.people) as props
  const [categories, setCategories] = useState(props.categories);
  const [categories2, setCategories2] = useState(props.categories2);

  const count = 0;
  const [firstOne, ...rest] = categories;
  const [firstOne2, ...rest2] = categories2;
  // console.log(firstOne)
  console.log(firstOne2);

  let nodes = categories2.map((person, i) => {
    return (
      <Node
        key={i}
        categories={rest}
        setCategories={setCategories}
        firstOne={firstOne}
        categories2={rest2}
        setCategories2={setCategories2}
        firstOne2={firstOne2}
        // count={count + i}
      />
    );
  });

  return (
    <div>
      <ul className="org">{nodes}</ul>
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
