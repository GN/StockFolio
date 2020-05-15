import React from "react";
import {Redirect} from 'react-router-dom';
class logout extends React.Component {
    constructor(props) {
        super(props);
    }
    logout = () => {
        localStorage.removeItem('token');
        console.log("GG BYEE");
        this.props.logOut();
    };

    render() {
        this.logout();
        return <Redirect to='/' push={true}/>;
    }
}
export default logout;