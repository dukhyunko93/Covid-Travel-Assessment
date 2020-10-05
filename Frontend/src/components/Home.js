import React, { Component } from "react";
import Iframe from 'react-iframe'
import {H1} from 'baseui/typography'

export default class Home extends Component {
    
    


    render() {
        return (
           <div className="iframeDash">
           <Iframe 
            width= "100%"
            height="100%" 
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0" 
            title="COVID-19" 
            src="https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"/>
          </div>
        );
    }
}