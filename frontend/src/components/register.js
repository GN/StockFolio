import React from 'react';
import {Container, Tab, Tabs} from 'react-bootstrap'
import axios from "axios";
import {Redirect} from "react-router-dom"
import ManagerRegistration from "./partials/managerRegistration";
import ClientRegistration from "./partials/clientRegistration";

class Register extends React.Component{
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
                <Tabs defaultActiveKey="client" id="uncontrolled-tab-example">
                    <Tab eventKey="client" title="Client Registration">
                        <ClientRegistration/>
                    </Tab>
                    <Tab eventKey="manager" title="Manager Registration">
                        <ManagerRegistration/>
                    </Tab>

                </Tabs>
            </Container>
        );
    }
}

export default Register;