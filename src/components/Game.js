import React, { Component } from 'react';
import artists from '../static/data/artists.json';
import List from './List';
import GameOver from './GameOver';
import HighScore from './HighScore';
import LeaderPopUp from './LeaderPopup';

let numberOfRounds = 10;

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentArtist: '',
            albumName: '',
            albumPic: '',
            answers: [],
            score: 0,
            round: 0,
            try: 1,
            highScore: {
                name: 'No One',
                score: 0
            }
        }
        this.getRandomArtist = this.getRandomArtist.bind(this)
        this.getAlbum = this.getAlbum.bind(this)
        this.answers = this.answers.bind(this)
        this.updateScore = this.updateScore.bind(this)
        this.newGame = this.newGame.bind(this)
        this.updateHighScore = this.updateHighScore.bind(this)
    }
    componentWillMount() {
        this.getAlbum()
    }
    getRandomArtist() {// Fetch random artist from artists data
        let ran = Math.floor(Math.random() * (Object.keys(artists).length));
        let randomArtist = {
            name: Object.keys(artists)[ran],
            id: Object.values(artists)[ran]
        }
        return randomArtist
    }
    getAlbum() { //fetch album from iTunes API by artist id
        let artist = this.getRandomArtist()
        fetch(`https://itunes.apple.com/lookup?id=${artist.id}&entity=album`)
            .then(res => { return res.json() })
            .then(data => {
                let ran = Math.floor(Math.random() * ((data.results.length - 1) + 1)) + 0;
                console.log('data[ran]', data.results[ran])
                this.setState({
                    currentArtist: data.results[ran].artistName,
                    albumName: data.results[ran].collectionName,
                    albumPic: data.results[ran].artworkUrl100.replace('100x100', '400x400')
                }, () => {
                    this.setState({ answers: this.answers(), round: this.state.round + 1 }, () => console.log('this.state', this.state, this.state.round))
                })
            })
    }
    answers() { //Sets an array of random answers and set the correct answer in a random place
        let arr = []
        let i = 1
        while (i < 5) {
            let ranArtist = this.getRandomArtist().name
            if (!(ranArtist === this.state.currentArtist) && !(arr.includes(ranArtist))) {
                arr.push(ranArtist)
                i++
            }
        }
        let ran = Math.floor(Math.random() * 5) + 1
        arr.splice(ran, 0, this.state.currentArtist)
        return arr
    }
    updateScore(score) {//Updates the score state, passed to the List component as props and being called from it
        this.setState({ score: this.state.score + score })
    }
    newGame() {// Initializing round and score state and fetch new album for a new game
        this.setState({ round: 0, score: 0 }, () => this.getAlbum())
    }
    updateHighScore() {//getting the highscore holders name, passed as a props to the LeaderPopUp component and called from it  
        this.setState({
            highScore: {
                name: document.querySelector('.leader-name').value,
                score: this.state.score
            }
        })
    }
    render() {
        return (
            <div className='game-wraper' style={{ backgroundImage: `url(${this.state.albumPic})` }}>
                <div className="game-container" >
                    {this.state.round <= numberOfRounds &&
                        <div className="state-qustion">
                            <div className="game-state-container">
                                <p>Score: {this.state.score}</p>
                                <p>Question: {this.state.round}/{numberOfRounds}</p>
                            </div>
                            <div className="question-box">
                                <div className="album-pic" style={{ backgroundImage: `url(${this.state.albumPic})` }} ></div>
                                <List answers={this.state.answers} currentArtist={this.state.currentArtist} getAlbum={this.getAlbum}
                                    updateScore={this.updateScore} />
                            </div>
                        </div>
                    }
                    {this.state.round > numberOfRounds && this.state.score <= this.state.highScore.score && <GameOver />}
                    {this.state.highScore.score > 0 && this.state.round < numberOfRounds && <HighScore highScore={this.state.highScore} />}
                    {this.state.round > numberOfRounds && this.state.score > this.state.highScore.score && <LeaderPopUp updateHighScore={this.updateHighScore} />}
                    <button className="new-game-btn" onClick={this.newGame}>New Game</button>
                </div>
            </div>
        )
    }
}