import React from "react";
import Sidebar from '../components/partials/sidebar'
import {Redirect} from "react-router-dom";

class dashboard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            accountType: this.props.accountType,
            activeSession: this.props.activeSession
        }
    }


    render() {
        const managerDashboard = (
            <div className="d-flex" id="wrapper">
                <Sidebar />
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <h1 className="mt-4">Simple Sidebar</h1>
                        <p>The starting state of the menu will appear collapsed on smaller screens, and will appear
                            non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
                        <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar
                            is optional, and just for demonstration. Just create an element with
                            the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
                    </div>
                </div>
            </div>
        );

        const customerDashboard = (
            <div className="d-flex" id="wrapper">
                <Sidebar />
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <h1 className="mt-4">Simple Sidebar</h1>
                        <p>The starting state of the menu will appear collapsed on smaller screens, and will appear
                            non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
                        <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar
                            is optional, and just for demonstration. Just create an element with
                            the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
                    </div>
                </div>
            </div>
        );


        if(this.state.activeSession && this.state.accountType === "Manager"){
            return managerDashboard;
        }
        else if(this.state.activeSession && this.state.accountType === "Customer"){
            return customerDashboard;
        }
        else{
            return <Redirect to='/' push={true}/>;
        }
    }
}

export default dashboard;