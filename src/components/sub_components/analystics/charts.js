import React, { Component } from 'react';
import TopEmployee from './topEmployeeChart';
import SalesByCountry from './salesByCountryChart';
import Last30 from './past30dayschart';
import PieChart from './piechart';
import Axios from 'axios';
import Loader from '../update/loader';

class Charts extends Component {

    constructor() {
        super()
        this.state = {
            clients: [],
            select: 'country',
            todaysMonth: new Date().getMonth(),
            todaysDay: new Date().getDate(),
            todaysYear: new Date().getFullYear()
        }
    }

    componentWillMount = async () => {
        let data = await Axios.get('/clients');
        this.setState({ clients: data.data });
    }

    changeSelect = (value) => {
        this.setState({ select: value })
    }

    generateClientJoined = () => {
        let lastMonthCounter = 0;
        // let counter6to12 = 0;
        // let yearandmoreCouner = 0;
        // let firstContacts = [];
        for (let c of this.state.clients) {
            let time = c.firstContact;
            time = time.split('-');
            let year = parseInt(time[0]);
            let month = parseInt(time[1]);
            if (year === this.state.todaysYear && month === this.state.todaysMonth + 1) { //i think is fine
                lastMonthCounter = lastMonthCounter + 1;
            }

        }
        console.log(lastMonthCounter);
        // console.log(counter6to12);
    }

    generateCountrySales = () => {
        if (this.state.select === 'month') {
            let sum = 0;
            let date;
            let months = [{ country: 'Jan', sales: null }, { country: 'Feb', sales: null }, { country: 'Mar', sales: null }, { country: 'Apr', sales: null },
            { country: 'May', sales: null }, { country: 'Jun', sales: null }, { country: 'Jul', sales: null }, { country: 'Aug', sales: null },
            { country: 'Sep', sales: null }, { country: 'Oct', sales: null }, { country: 'Nov', sales: null }, { country: 'Dec', sales: null }]
            for (let i = 0; i < 12; i++) {
                for (let c of this.state.clients) {
                    if (c.firstContact.split('-')[1].split('')[0] === '0') {
                        date = parseInt(c.firstContact.split('-')[1].split('')[1]);
                    }
                    else {
                        date = parseInt(c.firstContact.split('-')[1])
                    }
                    if (date === i + 1) {
                        sum = sum + 1;
                    }
                }
                months[i].sales = sum;
                sum = 0;
            }
            return months;
        }
        else {
            let countries = [];
            let countrySales = [];
            for (let d of this.state.clients) {
                countries.push(d[this.state.select]);
            }
            countries = countries.filter((v, i) => countries.indexOf(v) === i);
            for (let c of countries) {
                countrySales.push(this.findCountrySales(c));
            }
            for (let cs of countrySales) {
                if (cs.country === 'no') {
                    let index = countrySales.indexOf(cs);
                    countrySales.splice(index, 1)
                }
            }
            return countrySales;
        }

    }

    findCountrySales = (c) => {
        let select = this.state.select;
        let sales = 0;
        for (let cl of this.state.clients) {
            if (cl[select] === c && cl.sold) {
                sales = sales + 1;
            }
        }
        let country = c;
        if (c === null) {
            c = 'no'
        }
        console.log(c)
        country = c.split(' ')[0];
        return { country, sales }
    }

    generateTopEmployee = () => {
        let topEmployees = [];
        let top3 = [];
        let employees = [];
        for (let d of this.state.clients) {
            employees.push(d.owner);
        }
        employees = employees.filter((v, i) => employees.indexOf(v) === i);
        for (let e of employees) {
            topEmployees.push(this.findMax(e));
        }
        topEmployees.sort(function (a, b) {
            a = a.sales;
            b = b.sales;
            if (a > b) {
                return -1;
            }
            if (a < b) {
                return 1;
            }
            return 0;
        })
        for (let i = 0; i < 3; i++) {
            top3.push(topEmployees[i]);
        }
        return top3;
    }

    findMax = (e) => {
        let sales = 0;
        this.state.clients.map(c => {
            if (c.owner === e && c.sold) {
                sales = sales + 1;
            }
        })
        let name = e.split(' ')[0]
        return { name, sales }
    }

    render() {
        this.generateClientJoined();
        let countrySales = this.generateCountrySales();
        let top = this.generateTopEmployee();
        return (
            <div>
                {this.state.clients.length > 0 ?
                    <div>
                        <TopEmployee top={top} />
                        <SalesByCountry changeSelect={this.changeSelect} countrySales={countrySales} />
                        <Last30 />
                        <PieChart /></div>
                    :
                    <Loader />
                }

            </div>
        );
    }
}

export default Charts;