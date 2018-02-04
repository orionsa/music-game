import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Links from './Links';
import Game from './Game';
import Instructions from './Instructions';
import TopBar from './Topbar'


export default class App extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <HashRouter>
                <div>
                    <TopBar><Links/></TopBar>
                    <Route exact path='/' component={Game} />
                    <Route path='/instructions' component={Instructions} />
                </div>
            </HashRouter>
        )
    }
}