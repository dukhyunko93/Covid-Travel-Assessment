import CovidAssessment from './CovidAssessment'
import CovidGuidelines from './CovidGuidelines'
import CovidTable from './CovidTable'
import React from "react";

import {Drawer, ANCHOR} from 'baseui/drawer';
import {Button} from 'baseui/button';
import {KIND} from 'baseui/notification';

const YESTERDAY = 13;
export const LEVELS = {
    SEVERE: 'Level 1: Severe Uncontrolled Community Transmission',
    SIGNIFICANT: 'Level 2: Significant Uncontrolled Community Transmission',
    MODERATE: 'Level 3: Moderate, Controlled Transmission',
    MINIMAL: 'Level 4: Minimal, Controlled Transmission',
};
export const RISK_LEVELS = {
    [LEVELS.SEVERE]: {
        color: KIND.negative,
        dailyLife: [
            '1. Stay home, except for essential activities',
            '2. Avoid and cancel all gatherings of any size.',
            '3. All vulnerable individuals (65+ or with pre-existing health conditions) stay home when possible.',
            '4. Self-quarantine responsibly for 14 days if in close and prolonged contact with someone who has COVID-19.',
            '5. Wear face coverings to protect others.',
            '6. Essential workers practice special precautions to prevent spread.',
            '7. Avoid non-essential business and personal travel. Follow state guidance for quarantine after visiting certain locations.',
            '8. Avoid public transportation where possible.',
        ],
        groupLife: [
            '1. Cancel visits to nursing homes, long term care facilities, and hospitals.',
            '2. Avoid and cancel all indoor and outdoor gatherings, including concerts, rodeos, large sporting events, etc. Schools and afterschool activities for youth close, as directed by educational authorities',
        ],
    },
    [LEVELS.SIGNIFICANT]: {
        color: KIND.warning,
        dailyLife: [
            '1. Stay home when possible.',
            '2. Avoid and cancel medium (10-250 people) and large public and private gatherings (250+ people).',
            '3. All vulnerable individuals (65+ or with preexisting health conditions) stay home when possible.',
            '4. Self-quarantine responsibly for 14 days if in close and prolonged contact withsomeone who has COVID-19.',
            '5. Wear face coverings to protect others.',
            '6. Essential workers practice special precautions to prevent spread.',
            '7. Avoid non-essential business and personal travel. Follow state guidance for quarantine after visiting certain locations.',
            '8. Use public transportation with caution. Practice good hygiene and social distancing.'
        ],
        groupLife: [
            '1. Cancel visits to nursing homes, long term care facilities, and hospitals.',
            '2. Avoid and cancel medium and large gatherings indoor and outdoor, including concerts, large sporting events, etc.',
            '3. Phase in some activities for schools following public health guidance. Continue to practice good hygiene and social distancing.' 
        ]

    },
    [LEVELS.MODERATE]: {
        color: KIND.info,
        dailyLife: [
            '1. Stay home when possible.', 
            '2. Minimize attendance at medium (10-250 people) and large public and private gatherings (250+ people).',
            '3. All vulnerable individuals (65+ or with preexisting health conditions) stay home when possible.',
            '4. Self-quarantine responsibly for 14 days and monitor symptoms if in close and prolonged contact with someone who has COVID-19.',
            '5. Wear face coverings to protect others.',
            '6. Essential workers follow standard precautions.',
            '7. Limit visits to non-essential business and personal travel. Follow state guidance for quarantine after visiting certain locations.',
            '8. Continue to use public transportation. Practice good hygiene.',
        ],
        groupLife: [
            '1. Avoid visits to vulnerable populations in nursing homes, long term care facilities, and hospitals.',
            '2. Slowly phase in gatherings indoor and outdoor, including concerts, large sporting events, etc. Activities should follow any relevant guidance and capacity requirements.',
            '3. Phase in additional activities for schools following public health guidance. Continue to practice good hygiene and social distancing.', 
        ]


    },
    [LEVELS.MINIMAL]: {
        color: KIND.positive,
        dailyLife: [
            '1. Feel free to leave the house and resume in-person work schedules.',
            '2. Resume attending public and private gatherings freely.',
            '3. Vulnerable individuals (65+ or with preexisting health conditions) leave home as necessary. Good hygiene and social distancing are still recommended.',
            '4. Self-quarantine responsibly for 14 days if in close and prolonged contact with someone who has COVID-19.',
            '5. Resume non-essential travel. Avoid other states or countries where widespread transmission may still be occurring.',
            '6. Resume full public transportation use.',
        ],
        groupLife: [
            '1. Resume visiting vulnerable populations while practicing good hygiene and 6 feet of distance.',
            '2. Resume large indoor and outdoor gatherings, including concerts, large sporting events, etc., and activities should follow any relevant guidance.',
            '3. Resume school and after school activities as normal.',
        ]

    },


};


let bottomNavView = true
const toggleBottomNav = () => {
        bottomNavView = !bottomNavView
        if (bottomNavView === true){
            document.querySelector(".ag.eq").style.display = "block"
          } else {
            document.querySelector(".ag.eq").style.display = "none"
          }
    }

class Tripinfo extends React.Component {

    state = {
        population: "",
        covidData: [],
        isOpen: true,
        stateInfo: {}, 
        drawerStyle: {height: "20%", "z-index": "8"}
    }

    componentDidMount() {
        this.getCovidData()
        this.getPopulation()
        this.getLinks()
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.getCovidData()
            this.getPopulation()
            this.getLinks()
        }
    }

    getCovidData = () => {
        let config = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${this.props.token}`
            }
        }
        fetch(`http://localhost:3001/nytdata/${this.props.destinationfips[0].fips}`,config)
        .then(response => response.json())
        .then(response => {
            this.setState({covidData: response.data})
        })
    }


    getPopulation = () => {
        let fips = this.props.destinationfips[0].fips
        let state;
        let county;
        if (fips.length < 5){
            state = "0" + fips.slice(0,1)
            county = fips.slice(-3)
        } else {
            state = fips.slice(0,2)
            county = fips.slice(-3)
        }
  
        fetch(`https://api.census.gov/data/2019/pep/population?get=COUNTY,DATE_CODE,DATE_DESC,DENSITY,POP,NAME,STATE&DATE_CODE=12&for=county:${county}&in=state:${state}&key=51999fa2f3c7bac02dceb923be5b78f0d135a3d6`)
        .then(resp => resp.json())
        .then(data => { this.setState({
            population: data?.[1]?.[4]
            })
        })
    }
    
    getLinks = () => {
        const address = this.props.destination[0]?.address
        let splitAdd = address.split(", ")
        let stateName = splitAdd[1].toLowerCase()
        fetch(`https://api.covidtracking.com/v1/states/${stateName}/info.json`)
        .then(response => response.json())
        .then(response => this.setState({stateInfo: response}))             
    }
    

    getCasesDeltas = () => this.state.covidData.reduce((total, currentValue, currentIndex) => {
        if (currentIndex === 0 || currentIndex > this.state.covidData.length - 2) return total; // skip if the first day
        const prevValue = this.state.covidData?.[currentIndex-1];
        const delta = (currentValue?.[0]?.cases || 0) - (prevValue?.[0]?.cases || 0);
        return [...total, delta];
    }, []);

    getDeathsDeltas = () => this.state.covidData.reduce((total, currentValue, currentIndex) => {
        if (currentIndex === 0 || currentIndex > this.state.covidData.length - 2) return total; // skip if the first day
        const prevValue = this.state.covidData?.[currentIndex-1];
        const delta = (currentValue?.[0]?.deaths || 0) - (prevValue?.[0]?.deaths || 0);
        return [...total, delta];
    }, []);
  
    getLevelInfo = (casesDeltas) => {
        const YESTERDAY_DATA = casesDeltas[YESTERDAY];

        let level = LEVELS.MINIMAL;
        let color = KIND.positive;
        if (YESTERDAY_DATA > 400) {
            level = LEVELS.SEVERE
            color = KIND.negative;
        } else if (YESTERDAY_DATA > 201 && YESTERDAY_DATA < 400) {
            level = LEVELS.SIGNIFICANT;
            color = KIND.warning;
        } else if (YESTERDAY_DATA > 101 && YESTERDAY_DATA < 20) {
            level = LEVELS.MODERATE;
            color = KIND.info;
        }
        return {level, color};
    }

    render() {
        const cases = this.getCasesDeltas();
        const deaths = this.getDeathsDeltas();
        const level = this.getLevelInfo(cases);
        const delta = this.state.covidData?.[14]?.[0]?.cases - this.state.covidData?.[1]?.[0]?.cases;
        const guideline = RISK_LEVELS?.[level.level];

        return (
            <>
            <button className="open-risk-assessment" onClick={()=> this.setState({drawerStyle: {height: "20%", "z-index": "8"}})}><h3>Open Risk Assessment</h3></button>
            <Drawer
            // () => this.setState({isOpen: false})
                onClose={() => this.setState({drawerStyle: { height: "20%", "z-index": "8", "display": "none"}})}
                isOpen={this.state.isOpen}
                anchor={ANCHOR.bottom}
                overrides={{
                    Root: {
                        style: ({ $theme }) => {
                            return this.state.drawerStyle;
                        }
                    }
                }}
            >
            
            <div style={{display: "flex"}}>
                <div className="assessment">
                    <CovidAssessment cases={cases[YESTERDAY]} death={deaths[YESTERDAY]} delta={delta} level={level} stateInfo={this.state.stateInfo} />
                </div>
                <div className="data-table">
                    <CovidTable population={this.state.population} covidData={this.state.covidData} />
                </div>
                <div className="guidelines">
                    <CovidGuidelines guideline={guideline} />
                </div>
            </div>
            
          </Drawer>        
          </>
        )
    }
}

export default Tripinfo;
