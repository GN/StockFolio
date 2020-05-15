import React from 'react';
import {Form, Button, Container} from 'react-bootstrap'
import axios from "axios";
import {Redirect} from "react-router-dom"

class login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            activeSession: props.activeSession
        };
    }
    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };
    onSubmit = data => {
        console.log(this.state.email);
      data.preventDefault();
      axios.post('/api/login/', {
          email: this.state.email,
          password: this.state.password
      }).then((response) => {
          if (response.status === 200){
              localStorage.setItem('token', response.data.token);
              this.props.logIn();
          }
      }, (error) => {
          console.log(error);
      });
    };

    render() {
        if(this.props.session){
            return <Redirect to='/' push={true}/>;
        }
        return (
            <Container className={"pt-5"}>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="email" onChange={this.onChange} value={this.state.email}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="password" onChange={this.onChange} value={this.state.password}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default login;