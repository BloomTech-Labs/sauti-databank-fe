import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import CsvDownloader from 'react-csv-downloader';


const Graph = props => {
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvFormattedData, setCsvFormattedData] = useState([]);

  useEffect(() => {
    if (props.filteredData && props.checkboxOptions !== props.filtgiteredData) {
      props.setCheckboxOptions(props.filteredData);
    }
  }, []);

  //Gets headers for CSV. The keys are converted into 'headers', which determine the columns. The data values will only be inserted if the key column is there. Ex. Male and Female rows will only appear if there is a Gender column.
  let headers = (data) => {
    let allHeaders = [];
    //no crossfilter
    if (!props.crossFilter) {
      allHeaders = [props.index, {id: `size`, displayName: ''}];      
      allHeaders.push({ id: `${props.sampleSize}`, displayName: `Sample Size: ${props.sampleSize}` })
    } else {
      allHeaders = [
        { id: `${props.index}`, displayName: `${props.index}` },
        ...props.keys,
        { id: `${props.additionalFilter}` },
        { id: `${props.sampleSize}`, displayName: `Sample Size: ${props.sampleSize}` }
      ]
    }
    return allHeaders;
  }

  //this Formater assigns the right values to keys(column headers).
  let csvFormater = (data) => {    
    if(!props.crossFilter) {
      console.log('oldData', data)
      let firstKey = data.map(obj=> {return Object.keys(obj)[0]});
      let newData = data.map(obj => ({
        [`${firstKey[0]}`]: `${Object.values(obj)[0]}`, size: `${Object.values(obj)[1]}`
      }))
      console.log('NewData for Single', newData)

      return newData
    } 
    
    else if (props.additionalFilter) {
      data = data.map(obj => {
        let key = Object.keys(props.selectedCheckbox)[0];
        let val = Object.values(props.selectedCheckbox)[0];
        let o = Object.assign({}, obj);
        o[key] = val;
        console.log('O', o)
        return o;
      })
    }
    return data.map(obj=> {return Object.values(obj)}) 
  }

  let fileName = '';
  fileName = `${props.index && props.index}${props.crossFilter && ('_by_' + props.crossFilter)}${props.additionalFilter && `_where_${props.additionalFilter}:(${Object.values(props.selectedCheckbox)[0]})`}`

  useEffect(() => {
    setCsvFormattedData(csvFormater(props.csvData))
    setCsvHeaders(headers(props.csvData))
  }, [props.csvData])
  console.log("formater", csvFormattedData)
  return (
    <div className="Graph-Container">
      <div className='dwnld-btn'>
        <CsvDownloader
          datas={csvFormattedData}
          columns={csvHeaders}
          filename={fileName}
          suffix={`${new Date().toISOString()}`}
        ><button>Download⯆</button></CsvDownloader>
      </div>
      <ResponsiveBar
        data={props.data}
        keys={props.keys}
        indexBy={props.index}
        groupMode={props.groupMode} // Possibly add toggle selector to change group mode.
        margin={{ top: 50, right: 170, bottom: 75, left: 80 }}
        padding={0.3}
        innerPadding={3}
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
