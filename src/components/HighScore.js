import React, { Component } from 'react'

export default class HighScore extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log('props is ', this.props)
        return (
            <div className="highscore-container">

                <p> Current Highscore: {this.props.highScore.score}</p>
                <p>Set By: {this.props.highScore.name}</p>
            </div>
        )
    }
}