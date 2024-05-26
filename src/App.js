import './App.css';
import React, { Component } from 'react'
import Nav from './components/Nav';
import News from './components/News';
import {BrowserRouter as Router, Switch, Route,}from "react-router-dom" 
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component { 
  apikey = "3cdee41585d448229ee6a3257815fff8";
  state = {
    progress : 0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress});    
  }   
  render() {
    return (
      <div>
        <Router>
        <Nav/>
        <LoadingBar
        height={5}
        color='#f11946' position='fix'      
        progress={this.state.progress}
        />
        <Switch>
          <Route exact path="/"><News setProgress={this.setProgress} apikey={this.apikey} key={"general"} pageSize={6} country='in' category="general"/></Route>
          <Route exact path="/business"><News setProgress={this.setProgress} apikey={this.apikey} key={"business"} pageSize={6} country='in' category="business"/></Route>  
          <Route exact path="/entertainment"><News setProgress={this.setProgress} apikey={this.apikey} key={"entertainment"} pageSize={6} country='in' category="entertainment"/></Route>  
          <Route exact path="/health"><News setProgress={this.setProgress} apikey={this.apikey} key={"health"} pageSize={6} country='in' category="health"/></Route>  
          <Route exact path="/science"><News setProgress={this.setProgress} apikey={this.apikey} key={"science"} pageSize={6} country='in' category="science"/></Route>  
          <Route exact path="/sports"><News setProgress={this.setProgress} apikey={this.apikey} key={"sports"} pageSize={6} country='in' category="sports"/></Route> 
          <Route exact path="/technology"><News setProgress={this.setProgress} apikey={this.apikey} key={"technology"} pageSize={6} country='in' category="technology"/></Route>           
        </Switch>
        </Router>    
      </div>
    )
  }
}