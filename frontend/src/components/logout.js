import React from "react";
import {Redirect} from 'react-router-dom';
class logout extends React.Component {
    logout = () => {
        localStorage.removeItem('token');
        this.props.logOut();
    };

    render() {
        this.logout();
        return <Redirect to='/' push={true}/>;
    }
}
export default logout;