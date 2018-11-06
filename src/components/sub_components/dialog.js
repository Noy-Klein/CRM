import React, { Component } from 'react';

class Dialog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nameText: '',
            surText: '',
            countryText: '',
            name: props.name,
            country: props.country
        }
    }

    click = () => {
        let clientToChange = this.props.clients.find(c =>
            c._id === this.props.id
        );
        let name = clientToChange.name.split(' ')[0];
        let lastName = clientToChange.name.split(' ')[1];
        let country = clientToChange.country;
        let newName;
        let newCountry;
        if (this.state.nameText !== '') {
            if (this.state.surText !== '') {
                newName = this.state.nameText + ' ' + this.state.surText;
            }
            else {
                newName = this.state.nameText + ' ' + lastName;
            }
        }
        else {
            if (this.state.surText !== '') {
                newName = name + ' ' + this.state.surText;
            }
            else {
                newName = name + ' ' + lastName;
            }
        }
        if (this.state.countryText !== '') {
            newCountry = this.state.countryText;
        }
        else {
            newCountry = country;
        }
        this.props.dialogUpdate('country', newCountry, this.props.id);
        this.props.dialogUpdate('name', newName, this.props.id);
        this.props.close();
    }

    close = () => {
        this.props.close();
    }

    deleteClient = async () => {
        this.props.delete(this.props.id);
        this.close();
    }

    change = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className='dialog'>
                <div className='changes'>
                    <div className='addInput'>Name : </div>
                    <div className='addInput'>Surname : </div>
                    <div className='addInput'>Country : </div>
                </div>
                <div className='changes'>
                    <input className='Input' type='text' name='nameText' value={this.state.nameText} onChange={this.change} placeholder={this.props.name} /><br />
                    <input className='Input' type='text' name='surText' value={this.state.surText} onChange={this.change} placeholder={this.props.surname} /><br />
                    <input className='Input' type='text' name='countryText' value={this.state.countryText} onChange={this.change} placeholder={this.props.country} /><br />
                </div>
                <div className='changeBtns'>
                    <button className='dialogbtn updateB' type='button' onClick={this.click}>Update</button>
                    <button className='dialogbtn' type='button' onClick={this.deleteClient}>DELETE</button>
                    <button className='dialogbtn closeB' type='button' onClick={this.close}>Close</button>
                </div>
            </div>
        );
    }
}

export default Dialog;