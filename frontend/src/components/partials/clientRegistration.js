import React from 'react';
import {Form, Button, Container} from 'react-bootstrap'
import axios from "axios";
import {Redirect} from "react-router-dom"

class ClientRegistration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            email: "",
            managerEmail: "",
            activeSession: props.activeSession,
            signedUp: false
        };
    }
    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };
    onSubmit = data => {
        console.log(this.state.email);
        data.preventDefault();
        axios.post('/api/register/registerCustomer', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            managerEmail: this.state.managerEmail
        }).then((response) => {
            if (response.status === 200){
                this.setState({signedUp: true});
            }
        }, (error) => {
            console.log(error);
        });
    };

    render() {
        if(this.props.session){
            return <Redirect to='/' push={true}/>;
        }
        if(this.state.signedUp){
            return <Redirect to='/login' push={true}/>;
        }
        return (
            <Container className={"pt-5"}>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="name" onChange={this.onChange} value={this.state.name}>
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control type="text" placeholder="John Doe" />
                    </Form.Group>

                    <Form.Group controlId="password" onChange={this.onChange} value={this.state.password}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="email" onChange={this.onChange} value={this.state.email}>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="john@doe.com" />
                    </Form.Group>

                    <Form.Group controlId="managerEmail" onChange={this.onChange} value={this.state.managerEmail}>
                        <Form.Label>Account Manager Email:</Form.Label>
                        <Form.Control type="email" placeholder="manager@doe.com" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default ClientRegistration;