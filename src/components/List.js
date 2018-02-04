import React, { Component } from 'react'
import GameOver from './GameOver'

export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            try: 1,
            streak: 0,
            animation: false,
            CSSAnimationClass: ''
        }
        this.hendleClick = this.hendleClick.bind(this)
    }
    componentWillReceiveProps() {
        console.log('List component will receive props check');
        this.setState({ CSSAnimationClass: "answer-item slide-in" }, () => setTimeout(() => {
            console.log('SET TIME OUT CHECK')
            this.setState({ CSSAnimationClass: 'answer-item' })
        }, 1250))
    }
    hendleClick(answer, i) {
        console.log('answer is ', answer, i)
        if (answer === this.props.currentArtist) {
            let score = 0;
            console.log('YOU ARE RIGHT')
            switch (this.state.try) {
                case 1:
                    score = 10
                    console.log('score for this question is ', score)
                    //this.props.updateScore(score)
                    //this.props.getAlbum()
                    this.setState({ try: 1, streak: this.state.streak + 1 }, () => {
                        console.log('this.state.streak is ', this.state.streak)
                        let combo = 0
                        if (this.state.streak % 3 == 0) {
                            console.log('streak % 3')
                            combo = Math.pow(10, this.state.streak / 3)
                            console.log('combo is ', combo)
                        }
                        this.props.updateScore(score + combo)
                        this.props.getAlbum()
                    })
                    break
                case 2:
                    score = 5
                    console.log('score for this question is ', score)
                    this.props.updateScore(score)
                    //this.props.getAlbum()
                    this.setState({ try: 1 }, () => {
                        console.log('this.state.streak is ', this.state.streak)
                        this.props.getAlbum()
                    })
                    break
                case 3:
                    score = 2
                    console.log('score for this question is ', score)
                    this.props.updateScore(score)
                    //this.props.getAlbum()
                    this.setState({ try: 1 }, () => {
                        console.log('this.state.streak is ', this.state.streak)
                        this.props.getAlbum()
                    })
                    break
            }
        }
        else {
            console.log('YOU ARE WRONG')
            if (this.state.try < 3) {
                this.setState({ try: this.state.try + 1, streak: 0 })
            }
            else {
                this.setState({ try: 1, streak: 0 }, () => {
                    console.log('this.state.streak is ', this.state.streak)
                    this.props.updateScore(-5)
                    this.props.getAlbum()
                })
            }
        }
    }
    render() {
        //let time = 1000
        return (
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
        )
    }
}