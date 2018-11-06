import React, { Component } from 'react';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';

class TopEmployee extends Component {

    constructor(){
        super()
        this.state = {
            data: [{name: 'a', value:30}, {name: 'b', value: 40}]
        }
    }

    render() {
        return (
            <div className='chart4'>
                <span className='header'>Client Acquisition</span>
                <ResponsiveContainer width='100%' >
                    <PieChart width={730} height={250}>
                        <Pie data={this.state.data} dataKey="value" nameKey="name" cx="50%" cy="50%" fill="#82ca9d" label />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default TopEmployee;