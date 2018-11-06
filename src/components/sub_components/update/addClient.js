import React, { Component } from 'react';

class AddClient extends Component {

    constructor() {
        super()
        this.state = {
            newName: '',
            newLastName: '',
            newCountry: '',
            newOwner: '',
            newEmail: '',
            newType: ''
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

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    adding = () => {
        this.props.addClient(this.state.newName, this.state.newLastName, this.state.newCountry, this.state.newOwner, this.state.newEmail, this.state.newType);
        alert(this.state.newName + ' ' + this.state.newLastName + ' Was Added To The List!')
        this.setState({newName:'', newLastName:'', newCountry:'', newOwner:'', newEmail:'', newType:'' })
    }

    render() {
        let onlyOwnerNames = this.onlyOwners();
        return (
            <div>
                <h3>Add Client</h3>
                <div className='changes'>
                    <div className='addInput'>First Name:</div> 
                    <div className='addInput'>Last Name: </div>
                    <div className='addInput'>Country: </div>
                    <div className='addInput'>Owner:</div>    
                    <div className='addInput'>Email: </div>        
                    <div className='addInput'>Email Type: </div>    
                </div>
                <div className='changes'>
                    <input className='Input' type='text' name='newName' value={this.state.newName} onChange={this.change} placeholder='First Name' /><br />
                    <input className='Input' type='text' name='newLastName' value={this.state.newLastName} onChange={this.change} placeholder='Last Name' /><br />
                    <input className='Input' type='text' name='newCountry' value={this.state.newCountry} onChange={this.change} placeholder='Country' /><br />
                    <select className='Input selectOfAdd' name='newOwner' value={this.state.newOwner} onChange={this.change}>
                        <option key='0'>Select Owner</option>
                        {onlyOwnerNames.map(o=>{
                            return <option key={o}>{o}</option>
                        })}
                    </select>
                    <input className='Input' type='text' name='newEmail' value={this.state.newEmail} onChange={this.change} placeholder='Email' /><br />
                    <select className='Input selectOfAdd' type='text' name='newType' value={this.state.newType} onChange={this.change}>
                        <option key='first1'>Select Email Type</option>
                        <option key='a'>A</option>
                        <option key='b'>B</option>
                        <option key='c'>C</option>
                        <option key='d'>D</option>
                    </select>
                </div>
                <div className='btn'>
                    <button className='AddBtn' type='button' onClick={this.adding}>Add New Client</button>
                </div>
            </div>
        );
    }
}

export default AddClient;