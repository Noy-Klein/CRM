import React, { Component } from 'react';
import Dialog from './dialog';
// import Modal from 'react-awesome-modal';

class Client extends Component {

    constructor() {
        super()
        this.state = {
            visible: false
        }
    }

    fixDate = () => {
        let time = this.props.first_contact;
        time = time.split('-');
        let year = time[0];
        let month = time[1];
        let day = time[2][0] + '' + time[2][1];
        return (day + '/' + month + '/' + year);
    }

    openModal = () => {
        this.setState({
            visible: true
        });
    }

    closeModal = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        let sold;
        let email;
        let date = this.fixDate();
        // let date = this.props.first_contact;
        if (this.props.sold) {
            sold = 'http://www.clker.com/cliparts/b/l/n/Q/E/5/check-mark-13x13-hi.png';
        }
        else {
            sold = null;
        }
        if (this.props.email === null) {
            email = '-'
        }
        else {
            email = this.props.email;
        }
        return (
            <div>
                <div onClick={this.openModal} key={this.props.id} >
                    <div className='name'>{this.props.name}</div>
                    <div className='surname'>{this.props.surname}</div>
                    <div className='country'>{this.props.country}</div>
                    <div className='firstcontact'>{date}</div>
                    <div className='email'>{email}</div>
                    <div className='sold'>{sold !== null ? <img alt='check' src={sold} height='20' width='20' /> : '-'}</div>
                    <div className='owner'>{this.props.owner}</div>
                </div>
                <hr />
                {this.state.visible ? 
                     <Dialog delete={this.props.delete} dialogUpdate={this.props.dialogUpdate} clients={this.props.clients} close={this.closeModal} id={this.props.id} name={this.props.name} surname={this.props.surname} country={this.props.country} />
                     : null}
            </div>

        );
    }
}

export default Client;