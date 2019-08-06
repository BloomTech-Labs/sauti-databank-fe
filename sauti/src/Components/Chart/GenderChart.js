// Importing dependencies
import React from 'react'; 
import { ResponsiveBar } from "@nivo/bar"; 

// Creating class for Gender Chart so it can hold state and receive props
class GenderChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [], 
            keys: ["Male", "Female"], 
            color: "nivo",
            femalePercent: 0, 
            malePercent: 0, 
        }; 
    }

// When chart renders, call this function to get percentages
componentDidMount() {
    this.getPercentages()
}

// Filters through props users Array for associated gender and gets array length 
getCounts = () => {

    // Calculations
    let femaleCount = this.props.distinctUsers.filter(u => u.gender === "Female").length;
    let maleCount = this.props.distinctUsers.filter( u => u.gender === "Male").length; 
    
    // Output
    return [femaleCount, maleCount]; 
}

// Converting counts to percentages 
getPercentages = () => {

    // Calling counter function, using reduce to create one value from an array 
    const totalCount = this.getCounts().reduce((a, b) => a + b); 

    // Getting percent of each gender
    let femalePercent = Math.round((this.getCounts()[0] / totalCount) *100);
    let malePercent = Math.round((this.getCounts()[1] / totalCount) * 100); 

    // Sending new percentages to state at highest level
    this.setState({
        ...this.state, 
        femalePercent: femalePercent, 
        malePercent: malePercent, 
    }, () => {
        // Setting state a second time to populate data in Nivo table
        this.setState({
            ...this.state, 
            data: [
                {
                    Gender: "Female", 
                    Female: this.state.femalePercent, 
                    FemaleColor: "hsl(65, 70%, 50%)",
                }, 
                {
                    Gender: "Male",
                    Male: this.state.malePercent,
                    MaleColor: "hsl(65, 70%, 50%)",
                },   
            ],
        })
    })
}

render() {
    return (
      <div className="Chart">
        <h2>
          Trader Gender Ratio 
        </h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Gender"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="stacked"
          colors={{ scheme: this.state.color }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          maxValue={100}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Gender",
            legendPosition: "middle",
            legendOffset: 30
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "%",
            legendPosition: "middle",
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
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
  }
}

export default GenderChart;