import React, { Component } from 'react';

class Badge extends Component {
    render() {
        return (
            <span>
                <div className='order iconCircle'>{this.props.icon}</div>
                <div className='order info'>
                    <span className='sum'>{this.props.sum}</span><br />
                    <span className='text'>{this.props.text}</span>
                </div>
            </span>

        );
    }
}

export default Badge;