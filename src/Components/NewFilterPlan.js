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

const categories = {
  gender: ["male", "femail"],
  contry: ["kenya", "zimbabway", "uganda"],
  trade: ["carrots", "rice", "maize"]
};
var people = [
  {
    id: 1,
    name: "Managing Director",
    people: [
      {
        id: 2,
        name: "Sales Director"
      },
      {
        id: 3,
        name: "IT Director",
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
const Node = props => {
  let childnodes = null;

  // the Node component calls itself if there are children
  if (this.props.children) {
    childnodes = this.props.children.map(function(childnode) {
      return <Node node={childnode} children={childnode.people} />;
    });
  }

  // return our list element
  // display children if there are any
  return (
    <li key={this.props.node.id}>
      <span>{this.props.node.name}</span>
      {childnodes ? <ul>{childnodes}</ul> : null}
    </li>
  );
};

export const Organisation = props => {
  // loop through the persons array and create a new component for each, passing the current person (id and name) and it's children (person.people) as props

  let nodes = people.map(function(person) {
    return <Node node={person} children={person.people} />;
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
