import React from "react";
import {Link} from "react-router-dom";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";

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
            <NavDropdown href="" title={this.props.name} id="basic-nav-dropdown">
                <NavDropdown.Item href=""><Link to='/logout'>Logout</Link></NavDropdown.Item>
                <NavDropdown.Item href=""><Link to='/dashboard'>Dashboard</Link></NavDropdown.Item>
            </NavDropdown>
        );
        const notLoggedIn = (
            <Navbar.Text>
                <a><Link to='/login'>Login</Link></a> / <a><Link to='/register'>Register</Link></a>
            </Navbar.Text>
        );

        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">StockFolio</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                {this.props.activeSession ? loggedIn : notLoggedIn}
            </Navbar>
        )
    }
}
export default navbar