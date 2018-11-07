import React, { Component } from 'react';
import Client from './sub_components/client';
import ClientCategories from './sub_components/client_categories';
import Axios from 'axios';
import Loader from './sub_components/update/loader';
const FontAwesome = require('react-fontawesome');

class Clients extends Component {
    constructor() {
        super()
        this.state = {
            clients: [],
            searchText: '',
            selected: 'name',
            courrentPage: 0
        }
    }

    componentWillMount = async () => {
        let data = await Axios.get('/clients');
        this.setState({ clients: data.data });
    }

    dialogUpdate = async (prop, value, id) => {
        let clientToChange = this.state.clients.find(c =>
            c._id === id);
        let index = this.state.clients.indexOf(clientToChange);
        let demoClients = [...this.state.clients]
        demoClients[index][prop] = value;
        Axios({
            url: '/clients/' + id,
            method: 'put',
            data: {
                client: demoClients[index]
            }
        })
        this.setState({ clients: demoClients });
    }

    delete = (id) => {
        let clientToDelete = this.state.clients.find(c =>
            c._id === id
        );
        let index = this.state.clients.indexOf(clientToDelete);
        let demoClients = [...this.state.clients];
        demoClients.splice(index, 1);
        let confirm = window.confirm('Are You Sure You Want To Delete ' + clientToDelete.name + ' ?');
        console.log(confirm)
        if (confirm === true) {
            Axios({
                url: '/clients/' + clientToDelete._id,
                method: 'delete',
                params: {
                    client: clientToDelete
                }
            }).then((data) => {
                console.log(data, 'deleted');
            });
            this.setState({ clients: demoClients })
        }
    }

    updateSearch = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    searchBar = (text, cat, clients) => { // works!!
        let matches = [];
        text = text.toLowerCase();
        cat = cat.toLowerCase();
        let name;
        for (let c of clients) {
            name = c[cat].toLowerCase();
            // name = c.emailType.toLowerCase();
            if (name.includes(text)) {
                matches.push(c);
            }
        }
        return matches;
    }

    next = () => {
        if (this.state.courrentPage > this.state.clients.length - 20) {
            return;
        }
        this.setState({ courrentPage: this.state.courrentPage + 20 })
    }

    prev = () => {
        if (this.state.courrentPage === 0) {
            return;
        }
        this.setState({ courrentPage: this.state.courrentPage - 20 })
    }

    render() {
        let clients = this.state.clients.slice(this.state.courrentPage, this.state.courrentPage + 20);
        let matches = this.searchBar(this.state.searchText, this.state.selected, clients);
        if (matches.length > 0) {
            clients = matches;
        }
        return (
            <div>
            {this.state.clients.length > 0 ? 
            <div className='container'>
                <div>
                    <input type='text' value={this.state.searchText} name='searchText' className='searchText' placeholder='search' onChange={this.updateSearch} />
                    <select className='options' onChange={this.updateSearch} name='selected' value={this.state.selected} >
                        <option>Name</option>
                        <option>Country</option>
                        <option>Owner</option>
                        <option>Email</option>
                    </select>
                    <div className='arrows'>
                        <span style={{ marginRight: '10px' }}><FontAwesome className='fas fa-arrow-left' name='arrow-left' onClick={this.prev} style={{ height: '5px', width: '5px' }} /></span>
                        <div style={{ display: 'inline-block', textAlign: 'center' }}>{this.state.courrentPage} - {this.state.courrentPage + 20}</div>
                        <span style={{ marginLeft: '8px' }}><FontAwesome className='fas fa-arrow-right' name='arrow-right' onClick={this.next} style={{ height: '5px', width: '5px' }} /></span>
                    </div>
                </div>
                <ClientCategories />
                {matches.length === 0 ?
                    <div>NO MATCHES</div> :
                    clients.map(c => {
                        return <Client delete={this.delete} dialogUpdate={this.dialogUpdate} clients={this.state.clients} open={this.openModal} id={c._id} key={c._id} name={c.name.split(' ')[0]} surname={c.name.split(' ')[1]} country={c.country} first_contact={c.firstContact} email={c.emailType} sold={c.sold} owner={c.owner} />
                    })}
            </div>
            :
        <Loader />
        }
            </div>
        );
    }
}

export default Clients;