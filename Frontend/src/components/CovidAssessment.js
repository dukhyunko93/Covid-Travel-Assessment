import * as React from 'react';
import { ListItem, ListItemLabel } from "baseui/list";
import {Notification, KIND} from 'baseui/notification';
import {Button} from 'baseui/button';

 /*The hot spots map shows the share of population with a new reported case over the last week. 
 Parts of a county with a population density lower than 10 people per square mile are not shaded. 
 Data for Rhode Island is shown at the state level because county level data is infrequently reported. 
 For total cases and deaths: The map shows the known locations of coronavirus cases by county. 
 Circles are sized by the number of people there who have tested positive or have a probable case of the virus, which may differ from where they contracted the illness. 
 For per capita: Parts of a county with a population density lower than 10 people per square mile are not shaded.   
 
 Risk factors:
Chances of contraction
    population density per cases  = Density of active cases per density of population'

Changes of death
    Your age per deaths in this area by the number of deaths in the US ?
    Your Age + co-morbidity + contraction %

Heatmap

DAILY CASES
 #of cases daily 
    > 400 Severe Level 1: Severe Uncontrolled
Community Transmission
    201 - 400 moderate  Level 2: Significant Uncontrolled
Community Transmission

101-200
Level 3: Moderate,
Controlled Transmission

Level 4: Minimal,
Controlled Transmission
<100 

    Density of cases per population

    day 8 - day 7 = fist num
     day 7 - day 6 = second num 
     day 6 - day 5 = thir d etx 
     get average of nums / 7 = ave cases daily

     if daily cases are > x do some colorize on heatmap component. 

        population(x) / 100000  = popscale
        #deaths/#cases = 
        on day 2/3/4 what is the (cases average / average deaths)


 */
export default (props) => {
const {cases, death, level, delta, stateInfo} = props;

    // if (!cases || !death || !level || !delta) return null;

    const renderRiskStatus = () => <Notification 
        kind={level.color}
        overrides={{
            Body: {
            style: () => ({ width: '100%'})
            }}}
        >{level.level}</Notification>;

    const renderYesterdayStats = () => <ul>
        <ListItem endEnhancer={() => <ListItemLabel>{cases}</ListItemLabel>}>
            <ListItemLabel>New Cases Yesterday:</ListItemLabel>
        </ListItem>
        <ListItem endEnhancer={() => <ListItemLabel>{death}</ListItemLabel>}>
            <ListItemLabel>New Deaths Yesterday:</ListItemLabel>
        </ListItem>
        <ListItem endEnhancer={() => <ListItemLabel>{delta} cases</ListItemLabel>}>
            <ListItemLabel>Within the last two weeks, there were:</ListItemLabel>
        </ListItem>
    </ul>;

   
    const stateInfoLinks = () => <ul>
     
        <ListItem endEnhancer={() => <ListItemLabel>
                <Button $as="a" href={stateInfo?.covid19Site} target="_blank">State Info</Button>
                </ListItemLabel>}>
        </ListItem>
        <ListItem endEnhancer={() => <ListItemLabel>
                <Button $as="a" href={stateInfo?.covid19SiteSecondary} target="_blank">Secondary State Info</Button>
                </ListItemLabel>}>
        </ListItem>
        <ListItem endEnhancer={() => <ListItemLabel>
                <Button $as="a" href={stateInfo?.covid19SiteTertiary} target="_blank">Tertiary State Info</Button>
                </ListItemLabel>}>
        </ListItem>
        <ListItem endEnhancer={() => <ListItemLabel>
                <Button $as="a" href={`https://twitter.com/${stateInfo?.twitter}`} target="_blank">Twitter Account</Button>
                </ListItemLabel>}>
        </ListItem>
        </ul>

  return (
  <>
    {renderRiskStatus()}
    {renderYesterdayStats()}
    {stateInfoLinks()}
  </>
  );
};

  
// https://api.covidtracking.com/v1/states/tx/info.json use this data 


