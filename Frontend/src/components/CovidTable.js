import * as React from 'react';
import {useStyletron} from 'baseui';
import {Table} from 'baseui/table';



export default (props) => {
    const {covidData, population} = props;
    if (!covidData?.length || !population?.length) return null;
    // if (!covidData || !covidData.length )
    // if (!covidData.length) //covidData null undefined
    const truncatedCovid = covidData.slice(1,15)
    const COLUMNS = ['Date', 'Total Cases', 'Total Deaths', 'State', 'County', 'Population'];    
    
    const DATA = (truncatedCovid || []).map(d => {
      const {date, cases, deaths, state, county} = d?.[0] || {}; // same as: d && d[0]
      return [date, cases, deaths, state, county, population];
    })

  const [css] = useStyletron();
  return (
    <div className={css({height: '100%', width: '100%'})}>
      <Table columns={COLUMNS} data={DATA} />
    </div>
  );
};


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
