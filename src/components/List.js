import React, { Component } from 'react'
import GameOver from './GameOver'

export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            try: 1,
            streak: 0,
            CSSAnimationClass: '',
            tryColor: 'lightgray'
        }
        this.hendleClick = this.hendleClick.bind(this)
    }
    componentWillReceiveProps() {// adding and removing CSS flag state in-order start the animation for every change of the props
        this.setState({ CSSAnimationClass: "answer-item slide-in" }, () => setTimeout(() => {
            this.setState({ CSSAnimationClass: 'answer-item' })
        }, 1250))
    }
    hendleClick(answer, i) {//hendling users answers and updating score acording to the game rules
        if (answer === this.props.currentArtist) {
            let score = 0;
            switch (this.state.try) {
                case 1:
                    score = 10
                    this.setState({ try: 1, streak: this.state.streak + 1 }, () => {
                        let combo = 0
                        if (this.state.streak % 3 == 0) {
                            combo = Math.pow(10, this.state.streak / 3)
                        }
                        this.props.updateScore(score + combo)
                        this.props.getAlbum()
                    })
                    break
                case 2:
                    score = 5
                    this.props.updateScore(score)
                    this.setState({ try: 1 }, () => {
                        this.props.getAlbum()
                    })
                    break
                case 3:
                    score = 2
                    this.props.updateScore(score)
                    this.setState({ try: 1, tryColor: 'lightgray' }, () => {
                        this.props.getAlbum()
                    })
                    break
            }
        }
        else {
            if (this.state.try == 2) {
                this.setState({ tryColor: 'red' })
            }
            if (this.state.try < 3) {
                this.setState({ try: this.state.try + 1, streak: 0 })
            }
            else {
                this.setState({ try: 1, streak: 0, tryColor: 'lightgray' }, () => {
                    this.props.updateScore(-5)
                    this.props.getAlbum()
                })
            }
        }
    }
    render() {
        return (
            <div className='list-wraper'>
                <ul className="answers-list">
                    {
                        this.props.answers.map((answer, i) =>
                            <li className={this.state.CSSAnimationClass} key={i} onClick={() => {
                                this.hendleClick(answer, i)
                            }}>
                                {answer}
                            </li>
                        )
                    }
                </ul>
                <p style={{ color: `${this.state.tryColor}` }}>Try: {this.state.try}/3</p>
            </div>
        )
    }
}