import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import CsvDownloader from 'react-csv-downloader';


const Graph = props => {
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvFormattedData, setCsvFormattedData] = useState([]);

  useEffect(() => {
    if(props.filteredData && props.checkboxOptions !== props.filteredData) {
      props.setCheckboxOptions(props.filteredData)
    }
  }, [])

  //Gets headers from data kays to be used as column headers in CSV.

 
    let headers = (data, data2) => {
      let allHeaders = [];
      if (Object.keys(data[0]).includes('request_value')){
        allHeaders = ['Request Value'];
        data.forEach(obj => {
          allHeaders.push(Object.keys(obj)[1]) 
        })
      }

      else if (data2){ 
        allHeaders = [`${props.indexBy}`];
        data2.forEach(obj => {
          allHeaders.push(Object.keys(obj)[1]) 
        })
      } 
        
      console.log('Headers', allHeaders)
      return allHeaders;

    };

    let csvFormater = (data, data2) => {
      
      if (Object.keys(data[0]).includes('request_value')){
        console.log('Data1', data)
        return data.map(obj=> {return Object.values(obj)}) 
      }

      else {
        console.log('Is there Data2?', data2)
        return data2
      } 
    }

   useEffect(()=> {
     setCsvFormattedData(csvFormater(props.data, props.csvData))
     setCsvHeaders(headers(props.data, props.csvData))
   }, [props.data, props.csvData])



  return (
    <div className="Graph-Container">
      <CsvDownloader datas={csvFormattedData} columns={csvHeaders} filename={'tradersData'} suffix={`${new Date().toISOString()}`}/> 
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
