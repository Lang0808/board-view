import React, {useState}from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import Navbar from './NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './Components/About';

class RealMain extends React.Component{
    render(){
        return (
            <div>
                <Router>
                <Navbar />
                <Switch>
                    <Route exact path='/' exact component={Main} />
                    <Route exact path='/about' component={About} />
                </Switch>
                </Router>
            </div>
        );
    }
}

//==================================================
ReactDOM.render(<RealMain/>, document.getElementById('root'));