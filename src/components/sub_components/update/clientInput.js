import React, { Component } from 'react';

class ClientInput extends Component {
    
    render() {
        return (
            <div>
                Client : <input list='clients' className='Input' placeholder='Client Name' value={this.props.currentClient} name='currentClient' onChange={this.props.change} />
                <datalist id="clients">
                    {this.props.clients.map(c => {
                        return <option key={c._id}>{c.name}</option>
                    })}
                </datalist>
            </div>
        );
    }
}

export default ClientInput;