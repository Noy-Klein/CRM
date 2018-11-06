import React, { Component } from 'react';

class Landing extends Component{
    render(){
        return(
            <div style={{textAlign: 'center'}}>
                <h1 style={{color: 'pink'}}>WELCOME</h1>
                <h2 style={{color: 'darkblue'}}>C</h2><h2 style={{color: 'blue'}}>R</h2><h2 style={{color: 'aqua'}}>M</h2>
                <p>Customer-relationship management is an approach to manage a
                    company's interaction with current and potential customers</p>
                    <img alt='landing' style={{height: '300px', width: '300px'}} src='https://media.istockphoto.com/vectors/businesswoman-riding-success-arrow-graph-vector-id956943780?k=6&m=956943780&s=612x612&w=0&h=TqDj_OCDDBKOw9zyV_pXlBqvc2xB5Zfr4ihcHUoK4H0='/>
            </div>
        )
    }
}

export default Landing;