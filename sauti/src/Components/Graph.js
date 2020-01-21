import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import CsvDownloader from 'react-csv-downloader';


const Graph = props => {
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvFormattedData, setCsvFormattedData] = useState([]);
  // console.log('Index in Graph', props.index);
  // console.log('CsvData in Graph', props.csvData);
  // console.log('Keys in Graph', props.keys);

  useEffect(() => {
    if(props.filteredData && props.checkboxOptions !== props.filteredData) {
      props.setCheckboxOptions(props.filteredData)
    }
  }, [])

  //Gets headers for CSV. 
  let headers = (data) => {
    let allHeaders = [];
    //no crossfilter
    if (!props.crossFilter){
      const firstValue = props.index === 'request_type' ? 'Request Value' : props.index
      allHeaders = [firstValue];
      data.forEach(obj => {
        allHeaders.push(Object.keys(obj)[1]) 
      })
    } else {
      allHeaders = [{id: `${props.index}`, displayName: `${props.index}`}, ...props.keys, {id: `${props.additionalFilter}`}]
      // props.csvData.unshift({[`${props.index}`]: `${props.index}`})
    }
      console.log('Headers', allHeaders)
      console.log('csv Props', props.csvData)
      console.log('checkbox', props.selectedCheckbox)
      return allHeaders;
    };

    

    let csvFormater = (data) => {
      if (props.selectedCheckbox) {
      data = data.map(obj => {
        let key = Object.keys(props.selectedCheckbox)[0];
        let val = Object.values(props.selectedCheckbox)[0];
        console.log('key', key, 'val', val)
        let o = Object.assign({}, obj);
        o[key] = val;
        console.log('o', o)
        return o;
        // obj = {...obj, key: Object.keys(props.additionalFilter)[0], value: Object.values(props.selectedCheckbox)[0]}
    })
    console.log('data after foreach', data)}
    
    
      // props.additionalFilter && data.push(Object.values(props.selectedCheckbox)[0])
      if (Object.keys(data[0]).includes('request_value')){
        // props.csvData.unshift({[`${props.index}`]: `${props.index}`})
        return data.map(obj=> {return Object.values(obj)}) 
      } else {
        return data
      } 
    }

    let fileName = '';
    fileName = `${props.index && props.index}${props.crossFilter && ('_by_' + props.crossFilter)}${props.additionalFilter && `_where_${props.additionalFilter}:(${Object.values(props.selectedCheckbox)[0]})`}` 


    console.log('FILENAME', fileName)

  useEffect(()=> {
    setCsvFormattedData(csvFormater(props.csvData))
    setCsvHeaders(headers(props.csvData))
  }, [props.csvData])

  return (
    <div className="Graph-Container">
      <CsvDownloader 
        className = 'dwnld-btn'
        datas={csvFormattedData} 
        columns={csvHeaders} 
        filename={fileName} 
        suffix={`${new Date().toISOString()}`}
      /> 
      <ResponsiveBar
        data={props.data}
        keys={props.keys}
        indexBy={
          props.index === "request_type" ? "request_value" : props.index
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
