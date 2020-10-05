import * as React from 'react';
import { Accordion, Panel } from "baseui/accordion";
import { ListItem, ListItemLabel } from "baseui/list";


export default ({guideline}) => {
    if (!guideline) return null;
    return (
        <Accordion>
            <Panel title="Daily Life">
                <ul>
                    {(guideline?.dailyLife || []).map(life => <ListItem><ListItemLabel key={life}>{life}</ListItemLabel></ListItem>)}
                </ul>
            </Panel>
            <Panel title="Group Life">
                <ul>
                    {(guideline?.groupLife || []).map(life => <ListItem><ListItemLabel key={life}>{life}</ListItemLabel></ListItem>)}
                </ul>
            </Panel>
        </Accordion>);
};

  
// https://api.covidtracking.com/v1/states/tx/info.json use this data 


