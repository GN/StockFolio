import React from "react";
import {Link} from "react-router-dom";
import { Navbar } from "react-bootstrap";

class navbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            session: props.activeSession
        };
    }

    render() {
        const loggedIn = (
            <Navbar.Text>
                Signed in as: <a>{this.props.name}</a>
                <p><Link to='/logout'>Logout</Link></p>
            </Navbar.Text>
        );
        const notLoggedIn = (
            <Navbar.Text>
                <a><Link to='/login'>Login</Link></a> / <a><Link to='/register'>Register</Link></a>
            </Navbar.Text>
        );

        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><Link to='/'>StockFolio</Link></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {this.props.activeSession ? loggedIn : notLoggedIn}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default navbar