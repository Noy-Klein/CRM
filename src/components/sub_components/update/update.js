import React, { Component } from 'react';
import ClientInput from './clientInput';
// import Loader from './loader';
// import Axios from 'axios';

class Update extends Component {

    constructor() {
        super()
        this.state = {
            currentClient: '',
            chosenOwner: '',
            chosenEmail: ''
        }
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sell = () => {
        if (this.state.currentClient === '') {
            alert('YOU HAVE NOT CHOSEN A CLIENT');
        }
        else {
            let client = this.props.clients.find(c => c.name === this.state.currentClient);
            this.props.update(true, 'sold', client._id);
            console.log(client);
            alert(client.name + ' Has Been Sold!')
            this.setState({chosenEmail: '', chosenOwner: '', currentClient: ''})
        }
    }

    transfer = () => {
        if (this.state.currentClient === '') {
            alert('YOU HAVE NOT CHOSEN A CLIENT');
        }
        else if (this.state.chosenOwner === '' || this.state.chosenOwner === 'Select Owner') {
            alert('YOU HAVE NOT CHOSEN AN OWNER');
        }
        else {
            let client = this.props.clients.find(c => c.name === this.state.currentClient);
            this.props.update(this.state.chosenOwner, 'owner', client._id);
            console.log(client);
            alert(client.name + ' Has Been Transfered To ' + client.owner)
            this.setState({chosenEmail: '', chosenOwner: '', currentClient: ''})
        }
    }

    send = () => {
        if (this.state.currentClient === '') {
            alert('YOU HAVE NOT CHOSEN A CLIENT');
        }
        else if (this.state.chosenEmail === '' || this.state.chosenEmail === 'Email Type') {
            alert('YOU HAVE NOT CHOSEN AN EMAIL TYPE');
        }
        else {
            let client = this.props.clients.find(c => c.name === this.state.currentClient);
            this.props.update(this.state.chosenEmail, 'emailType', client._id);
            console.log(client);
            alert(client.name + ' Has Been Declared!')
            this.setState({chosenEmail: '', chosenOwner: '', currentClient: ''})
        }
    }

    onlyOwners = () => {
        let ownerNames = [];
        for (let d of this.props.clients) {
            ownerNames.push(d.owner);
        }
        ownerNames = ownerNames.filter((v, i) => ownerNames.indexOf(v) === i);
        return ownerNames;
    }

    render() {
        let onlyOwnerNames = this.onlyOwners();
        return (
            <div>
                <div>
                    <h3>Update</h3>
                    <ClientInput change={this.change} currentClient={this.state.currentClient} clients={this.props.clients} />
                    <div className='changes'>
                        <div className='addInput'>Transfer Ownership To :</div>
                        <div className='addInput'>Send Email :</div>
                        <div className='addInput'>Declare Sale!</div>
                    </div>
                    <div className='changes'>
                        <select className='select Input' value={this.state.chosenOwner} name='chosenOwner' onChange={this.change} >
                            <option key='0'>Select Owner</option>
                            {onlyOwnerNames.map(o => {
                                return <option key={o}>{o}</option>
                            })}
                        </select>
                        <select className='select Input' value={this.state.chosenEmail} name='chosenEmail' onChange={this.change} >
                            <option>Email Type</option>
                            <option key='a'>A</option>
                            <option key='b'>B</option>
                            <option key='c'>C</option>
                            <option key='d'>D</option>
                        </select>
                        <select className='none'>
                        </select>
                    </div>
                    <div className='changes'>
                        <div className='updateBtn' onClick={this.transfer}>Transfer</div>
                        <div className='updateBtn' onClick={this.send}>Send</div>
                        <div className='updateBtn' onClick={this.sell}>Declare</div>
                    </div>
                </div>
                <br/>
                <hr />
            </div>
        );
    }
}

export default Update;