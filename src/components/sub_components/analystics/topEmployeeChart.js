import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
// import { eventNames } from 'cluster';

class TopEmployee extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: props.top
        }
    }

    render() {
        return (
            <div className='chart1'>
            <span className='header'>Top Employees</span>
                <ResponsiveContainer width='100%' >
                    <BarChart barCategoryGap='32%' layout="vertical" width={250} height={250} data={this.props.top}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type='number' />
                        <YAxis type='category' dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='sales' width={5} fill="darkblue" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default TopEmployee;