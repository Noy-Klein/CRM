import React, { Component } from 'react';
import Badge from './badge';
import Axios from 'axios';
import Loader from '../update/loader';
const FontAwesome = require('react-fontawesome');

class Badges extends Component {

    constructor() {
        super()
        this.state = {
            clients: []
        }
    }

    componentWillMount = async () => {
        let data = await Axios.get('http://localhost:2000/clients');
        this.setState({ clients: data.data });
    }

    generateNewClients = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        let sum = 0;
        let todaysMonth = new Date().getMonth() + 1;
        let todaysYear = new Date().getFullYear();
        for (let c of this.state.clients) {
            let time = c.firstContact;
            time = time.split('-');
            let year = parseInt(time[0]);
            let month = parseInt(time[1]);
            if (todaysMonth === month && todaysYear === year) {
                sum = sum + 1;
            }
        }
        return { sum: sum, month: monthNames[todaysMonth - 1] };
    }

    generateEmailsSent = () => {
        let sum = this.state.clients.filter(c => c.emailType !== null);
        sum = sum.length;
        return sum;
    }

    generateOutstanding = () => {
        let sum = this.state.clients.filter(c => c.sold === false);
        sum = sum.length;
        return sum;
    }

    generateHottestCountry = () => {
        let sum = 0;
        let maxSum = 0;
        let country;
        let countries = [];
        for (let d of this.state.clients) {
            countries.push(d.country);
        }
        countries = countries.filter((v, i) => countries.indexOf(v) === i);
        for (let countryType of countries) {
            this.state.clients.filter((c) => { return c.country === countryType }).map((cou) => {
                if (cou.sold) {
                    sum = sum + 1;
                }
            });
            if (sum > maxSum) {
                maxSum = sum;
                country = countryType;
            }
            sum = 0;
        }
        return country;
    }

    render() {
        return (
            <div>
                {this.state.clients.length > 0 ?
                    <div className='badgeContainer'>
                        <div className='badge'><Badge text={'New ' + this.generateNewClients().month + ' Members'} sum={this.generateNewClients().sum} icon={<FontAwesome className='fas fa-chart-line' name='chart-line' size='4x' style={{ backgroundColor: '#00e673', borderRadius: '50%', padding: '15px', color: 'white' }} />} /></div>
                        <div className='badge'><Badge text='Emails Sent' sum={this.generateEmailsSent()} icon={<FontAwesome className='fas fa-envelope' name='envelope' size='4x' style={{ backgroundColor: '#4d79ff', borderRadius: '50%', padding: '15px', color: 'white' }} />} /></div>
                        <div className='badge'><Badge text='Outstanding Clients' sum={this.generateOutstanding()} icon={<FontAwesome className='fas fa-user-circle' name='user-circle' size='4x' style={{ backgroundColor: '#ff4d4d', borderRadius: '50%', padding: '15px', color: 'white' }} />} /></div>
                        <div className='badge'><Badge text='Hottest Country' sum={this.generateHottestCountry()} icon={<FontAwesome className='fas fa-globe-americas' name='globe-americas' size='4x' style={{ backgroundColor: '#ffd11a', borderRadius: '50%', padding: '15px', color: 'white' }} />} /></div>
                    </div>
                    :
                    <Loader />
                }
            </div>

        );
    }
}

export default Badges;