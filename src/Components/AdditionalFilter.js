// import React from "react";
// const AdditionalFilter = () => {
//   return (
//     // <>
//     <div>
//       <p>Additional Filter</p>
//       <p className="disclosure">
//         *This optional filter adjusts samplesize and may not always alter the
//         graph appearance.
//       </p>
//       <Dropdown
//         controlClassName="myControlClassName"
//         arrowClassName="myArrowClassName"
//         className="dropdown"
//         disabled={loading}
//         options={FilterBoxOptions.default.filter(
//           obj =>
//             obj.label !== filterBoxIndexLabel &&
//             obj.label !== filterBoxCrossLabel
//         )}
//         value={filterBoxAdditionalFilterLabel}
//         placeholder="Select a filter..."
//         onChange={e => {
//           setFilterBoxAdditionalFilter({
//             type: e.value.type,
//             query: e.value.query,
//             label: e.label
//           });
//           setFilterBoxAdditionalFilterLabel(e.label);
//           props.setCheckboxOptions([]);
//           ClickTracker(e.value.type);
//         }}
//       />
//       <div
//         className="reset-btn"
//         onClick={() => {
//           setFilterBoxAdditionalFilter({ type: "", query: "" });
//           setFilterBoxAdditionalFilterLabel("");
//           props.setAdditionalFilter({ type: "", query: "" });
//           props.setCheckboxOptions([]);
//           props.setSelectedCheckbox({});
//         }}
//       >
//         <p>Clear Additional Filter</p>
//       </div>
//       {/* </> */}
//       {/* )} */}

//       {graphLabels[`${filterBoxAdditionalFilter.type}`] && (
//         <CheckboxContainer>
//           <p>Select an option to further filter the data: </p>
//           {graphLabels[`${filterBoxAdditionalFilter.type}`].labels.map(
//             option => (
//               <Options key={option}>
//                 <input
//                   type="radio"
//                   name="CrossFilter"
//                   value={option}
//                   onChange={e => (
//                     props.setSelectedCheckbox({
//                       [`${filterBoxAdditionalFilter.type}`]: option
//                     }),
//                     props.setAdditionalFilter(filterBoxAdditionalFilter)
//                   )}
//                 />
//                 <FilterOption>{option}</FilterOption>
//               </Options>
//             )
//           )}
//         </CheckboxContainer>
//       )}
//     </div>
//   );
// };

// export default AdditionalFilter;
