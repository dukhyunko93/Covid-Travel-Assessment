import * as React from 'react';
import { Accordion, Panel } from "baseui/accordion";
import "../style/Guideline.css"


export default ({guideline}) => {
    console.log(guideline)
    if (!guideline) return null;
    return (
        <Accordion>
            <Panel title="Daily Life">
                <ol>
                    {(guideline?.dailyLife || []).map(life => <li className="guidelineLife">{life}</li>)}
                </ol>
            </Panel>
            <Panel title="Group Life">
                <ol>
                    {(guideline?.groupLife || []).map(life => <li className="guidelineLife">{life}</li>)}
                </ol>
            </Panel>
        </Accordion>);
};

  
// https://api.covidtracking.com/v1/states/tx/info.json use this data 


