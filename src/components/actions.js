import React, { Component } from 'react';
import Update from './sub_components/update/update';
import AddClient from './sub_components/update/addClient';
import Axios from 'axios';
import uuid from 'uuid';

class Actions extends Component {
    constructor() {
        super()
        this.state = {
            clients: [],
            today: new Date().toISOString()
        }
    }

    componentWillMount = async () => {
        let data = await Axios.get('http://localhost:2000/actions');
        this.setState({ clients: data.data });
    }

    update = async (value, prop, id) => {
        let demoClients = [...this.state.clients]
        let client = demoClients.find(c => c._id === id);
        let index = demoClients.indexOf(client);
        demoClients[index][prop] = value;
        Axios({
            url: 'http://localhost:2000/clients/' + id,
            method: 'put',
            data: {
                client: demoClients[index]
            }
        })
        this.setState({ clients: demoClients });
    }

    addClient = (firstName, lastName, country, owner, email, type) => {
        let newClient = {
            _id: uuid(),
            name: firstName + ' ' + lastName,
            email: email,
            firstContact: this.state.today,
            emailType: type,
            sold: false,
            owner: owner,
            country: country
        }
        console.log(this.state.id)
        let demoClients = [...this.state.clients];
        demoClients.push(newClient);
        Axios({
            url: 'http://localhost:2000/addClient',
            method: 'post',
            data: {
                client: newClient
            }
        }).then(this.inc())
        this.setState({ clients: demoClients });
    }

    inc = () =>{
        this.setState({id: this.state.id + 1});
    }

    render() {
        return (
            <div className='page'>
                <Update update={this.update} clients={this.state.clients} />
                <AddClient clients={this.state.clients} addClient={this.addClient} />
            </div>
        );
    }
}

export default Actions;