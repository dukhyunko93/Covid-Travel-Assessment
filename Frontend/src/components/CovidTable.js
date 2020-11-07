import React, {Component} from 'react';
import {useStyletron} from 'baseui';
import {Table} from 'baseui/table';
import { LineChart } from 'react-chartkick'
import 'chart.js'


// export default (props) => {
//     const {covidData, population} = props;
//     if (!covidData?.length || !population?.length) return null;
//     // if (!covidData || !covidData.length )
//     // if (!covidData.length) //covidData null undefined
//     const truncatedCovid = covidData.slice(1,15)
//     const COLUMNS = ['Date', 'Total Cases', 'Total Deaths', 'State', 'County', 'Population'];    
    
//     const DATA = (truncatedCovid || []).map(d => {
//       const {date, cases, deaths, state, county} = d?.[0] || {}; // same as: d && d[0]
//       return [date, cases, deaths, state, county, population];
//     })

//   const [css] = useStyletron();
//   return (
//     <div className={css({height: '100%', width: '100%'})}>
//       <Table columns={COLUMNS} data={DATA} />
//     </div>
//   );
// };

class CovidTable extends Component {
  
  renderLinegraph = () => {
    const {covidData} = this.props;
    console.log(covidData)
    if (!covidData?.length) return null;
    let graphData = {};
    for(let i = 1; i < covidData.length - 1; i++){
      graphData[covidData[i][0].date] = (covidData[i][0].cases - covidData[i - 1][0].cases)
    }
    return <LineChart style={{}} data={graphData} />
  }

	render() {
    this.renderLinegraph()
		return (
      <>
        <h3>New Cases Past 14 Days</h3>
        <br></br>
        {this.renderLinegraph()}
      </>
		);
  }
}

export default CovidTable;       

// 0: Array(1)
// 0:
// cases: 44940
// confirmed_cases: null
// confirmed_deaths: null
// county: "Suffolk"
// date: "2020-09-02"
// deaths: 2003
// fips: 36103
// id: 494313
// probable_cases: null
// probable_deaths: null
// state: "New York"
