import React from 'react'; 
import { ResponsiveBar } from "@nivo/bar"; 
import axios from 'axios';

class EducationChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalCount: 0,
            data: [],
            keys: ["Primary", "Secondary", "University/College", "None"],
            color: 'nivo',
            primaryPercentage: 0,
            secondaryPercentage: 0,
            uniPercentage: 0,
            nonePercentage: 0

        }
    }


componentDidMount() {
    axios
    .get('https://sa-stage.herokuapp.com/users/all/education/all')
    .then(res => {
        console.log('main', res.data)
        this.setState({
            ...this.state,
            users: res.data,
            totalCount: res.data.length
        })
    }) 
    .get('https://sa-stage.herokuapp.com/users/all/education/all/primary')
    .then(res => {
        console.log('primary res data', res.data)
        this.setState({
            ...this.state,
            primaryPercentage: Math.round((res.data / this.state.totalCount) * 100)
        })
    })
    
    .get('https://sa-stage.herokuapp.com/users/all/education/all/secondary')
    .then(res => {
        this.setState({
            ...this.state,
            secondaryPercentage: Math.round((res.data / this.state.totalCount) * 100)
        })
    })

    
    .get('https://sa-stage.herokuapp.com/users/all/education/all/uni')
    .then(res => {
        this.setState({
            ...this.state,
            uniPercentage: Math.round((res.data / this.state.totalCount) * 100)
        })
    })


    .get('https://sa-stage.herokuapp.com/users/all/education/all/none')
    .then(res => {
        this.setState({
            ...this.state,
            nonePercentage: Math.round((res.data / this.state.totalCount) * 100)
        })
    })

    .catch(err => {
        console.log(err)
    })
    this.setPercentages();
    
}


setPercentages = () => {


        this.setState({
            ...this.state, 
            data: [
                {
                    Education: "Primary", 
                    Primary: this.state.primaryPercentage, 
                    PrimaryColor: "hsl(65, 70%, 50%)",
                }, 
                {
                    Education: "Secondary", 
                    Secondary: this.state.secondaryPercentage, 
                    SecondaryColor: "hsl(65, 70%, 50%)",
                },
                {
                    Education: "University/College", 
                    University: this.state.uniPercentage, 
                    UniversityColor: "hsl(65, 70%, 50%)",
                },
                {
                    Education: "No Formal Education", 
                    None: this.state.nonePercentage, 
                    NoneColor: "hsl(65, 70%, 50%)",
                },    
            ],
        })
}



render() {
    return (
      <div className="Chart">
        <h2>
          Education Level
        </h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Education"
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
            legend: "Education Level",
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

export default EducationChart;

