import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Index from './components/index'
import Login from './components/login'
import Navbar from "./components/partials/navbar";
import Logout from "./components/logout";
import Dashboard from './components/dashboard';
import {getSession} from "./actions/session";
import ManagerOverview from "./components/manager/overview"

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: getSession().name,
            email: getSession().email,
            accountType: getSession().accountType,
            activeSession: getSession().status
        }
    }

    logOut = () => {
        this.setState({activeSession: false});
    };

    logIn = () => {
        this.setState({
            activeSession: true,
            name: getSession().name,
            accountType: getSession().accountType,
            email: getSession().email
        });
    };

    render() {
        return (
            <Router>
                <Navbar activeSession={this.state.activeSession} name={this.state.name}/>
                <Switch>
                    <Route exact path='/' component={Index} />
                    <Route exact path='/login' render={(props) => <Login logIn={this.logIn} session={this.state.activeSession}/> }/>
                    <Route exact path='/logout' render={(props) => <Logout logOut={this.logOut}/>} />
                    <Route exact path='/dashboard' render={(props) => <Dashboard activeSession={this.state.activeSession} accountType={this.state.accountType} title={"Manager Overview"} content={<ManagerOverview/>}/>}/>
                </Switch>
            </Router>
        );
    }
}
export default App;
