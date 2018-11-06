import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

class Last30 extends Component {

    constructor(){
        super()
        this.state = {
            data: [{name: 'a', value:30}, {name: 'b', value: 40}],
            todaysMonth: new Date().getMonth(),
            todaysDay: new Date().getDate(),
            monthNames : ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]
        }
    }

    render() {
        return (
            <div className='chart3'>
                <span className='header'>Sales Since {this.state.monthNames[this.state.todaysMonth -1]} {this.state.todaysDay}</span>
                <ResponsiveContainer width='100%' >
                    <LineChart width={730} height={250} data={this.state.data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default Last30;