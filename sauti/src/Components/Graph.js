import React, { useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import CsvDownloader from 'react-csv-downloader';


const Graph = props => {
  useEffect(() => {
    if(props.filteredData && props.checkboxOptions !== props.filteredData) {
      props.setCheckboxOptions(props.filteredData)
    }
  }, [])

  //Gets headers from keys of incoming data to be used as column titles in downloaded CSV.
  // let headers = Object.keys(props.data[0]); 

  // const percentToRaw = (data) => {
  //   let restructured = data.map(obj=> {
  //     return Object.values(obj)
  //   })
    
  //   for(let i = 1; i < restructured.length; i++){
  //     if(Number.isInteger(restructured[i])){
  //       return parseFloat(restructured[i])
  //     }
  //   }
  //   console.log('IS RESTRCTURE NUMS?', restructured)

    // restructured = restructured.forEach(obj => {
    //   if(Number.isInteger(+obj)){
    //    console.log(' Object is Num?', obj)
    //    return parseFloat(obj)
    //   }
    // })

  //   return restructured;
  // }

  // let restructuredData = percentToRaw(props.data);


  // console.log(' RESTRUCTURED:', restructuredData)    
  // console.log(' DATA:', props.data)    

  return (
    <div className="Graph-Container">
      {/* <CsvDownloader datas={restructuredData} columns={headers} filename={'tradersDataCSV'} seperator={';'}/>  */}
      <ResponsiveBar
        data={props.data}
        keys={props.keys}
        indexBy={
          props.indexBy === "request_type" ? "request_value" : props.indexBy
        }
        groupMode={props.groupMode} // Possibly add toggle selector to change group mode.
        margin={{ top: 50, right: 170, bottom: 75, left: 80 }}
        padding={0.3}
        innerPadding={0}
        maxValue={100}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        tooltip={({ id, value }) => (
          <strong
            style={{
              color: "#000000",
              fontSize: "15px",
              fontFamily: "Helvetica"
            }}
          >
            {id}: {value}%
          </strong>
        )}
        labelFormat={d => <tspan y={-15}>{d}% </tspan>}
        labelForm={d => <text>{d}% </text>}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend:
            props.label +
            " (values as percent of total)," +
            ` sample size = ${props.sampleSize}`,
          legendPosition: "middle",
          legendOffset: 35
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Percentage", // Possibly toggle percentage or number in future release
          legendPosition: "middle",
          legendOffset: -60
        }}
        labelSkipWidth={0}
        labelSkipHeight={0}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default Graph;
