import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

class SalesBy extends Component {

    constructor(){
        super()
        this.state = {
            select: ''
        }
    }

    change = (e) =>{
        this.setState({select: e.target.value}, ()=>{
            this.props.changeSelect(this.state.select)
        })
    }

    render() {
        console.log(this.state.select)
        return (
            <div className='chart2'>
            <span className='header'>Sales By - 
                <select className='Input' value={this.state.select} onChange={this.change}>
                    <option key='country'>country</option>
                    <option key='owner'>owner</option>
                    <option key='emailType'>emailType</option>
                    <option key='Month'>month</option>
                </select>
            </span>
                <ResponsiveContainer width='100%' >
                    <BarChart width={250} height={250} data={this.props.countrySales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type='category' dataKey='country' />
                        <YAxis type='number'/>
                        <Tooltip />
                        <Bar dataKey="sales" fill="#8080ff" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default SalesBy;