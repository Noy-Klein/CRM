import React, { Component } from 'react';

class Client_Categories extends Component {
    render() {
        return (
            <div className='categories'>
                <div className='name'>Name</div>
                <div className='surname'>Surname</div>
                <div className='country'>Country</div>
                <div className='firstcontact'>First Contact</div>
                <div className='email'>Email</div>
                <div className='sold'>Sold</div>
                <div className='owner'>Owner</div>
            </div>
        );
    }
}

export default Client_Categories;