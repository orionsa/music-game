import React, {Component} from 'react';

export default class LeaderPopUp extends Component {
    constructor(props){
        super(props)
    }
    render(){
        console.log('LeaderPopUp')
        return(
            <div className='popup-outer'>
                <div className='popup-inner'>
                    <h1 className='popup-header'>New High Score!!!</h1>
                    <div className='leader'>
                        <p>Please enter your name</p>
                        <input className='leader-name' type='text'/>
                    </div>
                    <button onClick={this.props.updateHighScore}>submit</button>
                </div>
            </div>
        )
    }
}