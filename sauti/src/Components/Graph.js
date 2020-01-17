import React, { useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import CsvDownloader from 'react-csv-downloader';


const Graph = props => {
  useEffect(() => {
    if(props.filteredData && props.checkboxOptions !== props.filteredData) {
      props.setCheckboxOptions(props.filteredData)
    }
  }, [])

  //Gets headers from data kays to be used as column headers in CSV.
  let headers = Object.keys(props.data[0]); 
  console.log(' HEADERS', headers);
  console.log(' DATA IN GRAPH', Object.values(props.data));


  return (
    <div className="Graph-Container">
      <CsvDownloader datas={props.data} columns={headers} filename={'tradersData'} suffix={`${new Date().toISOString()}`}/> 
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
