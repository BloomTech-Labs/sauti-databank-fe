import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar"
import './temp.css'

const firstLetterUpper = word => {
    let split = word.split("")
    split[0].toUpperCase()
    let joined = split.join('')
    return joined
}

const getMaxValue = data => {
    let max = 0
    data.forEach(obj => {
        let values = Object.values(obj)
        values = values.map(i => parseInt(i, 10)).filter(item => Number(item) === item)
        let possMax = Math.max(...values)
        if(possMax > max){
            max = possMax
        }
    })
    return max
}

const Graph = props => {
// console.log(props.keys)
// console.log(props.data)
        return (
           <div className="Graph-Container">
              <ResponsiveBar
                data={props.data}
                keys={props.keys}
                indexBy={props.indexBy}
                groupMode={"grouped"} // Possibly add toggle selector to change group mode.
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                innerPadding={0}
                maxValue={getMaxValue(props.data)}
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: firstLetterUpper(props.indexBy),
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Quantity', // Possibly toggle percentage or number in future release
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
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
        )
};

export default Graph