import React, { Component } from 'react';
import Badges from './sub_components/analystics/badges';
import Charts from './sub_components/analystics/charts';

class Analystics extends Component{
    render(){
        return(
            <div>
                <Badges />
                <Charts />
            </div>
        );
    }
}

export default Analystics;