import React, { Component } from 'react';

export default class LeaderPopUp extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='popup-outer'>
                <div className='popup-inner'>
                    <h1 className='popup-header'>New High Score!</h1>
                    <input className='leader-name' type='text' placeholder='Your Name' />
                    <button onClick={this.props.updateHighScore}>submit</button>
                </div>
            </div>
        )
    }
}