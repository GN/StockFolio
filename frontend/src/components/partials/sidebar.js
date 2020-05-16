import React from "react";
import {Redirect} from "react-router-dom";

class sidebar extends React.Component{

    render() {

        const managerSidebar = (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <a href="#" className="list-group-item list-group-item-action bg-light">Overview</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light">Manage Available Stocks</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light">Manage Customer</a>
                </div>
            </div>

        );

        const customerSidebar = (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Customer Overview</div>
                <div className="list-group list-group-flush">
                    <a href="#" className="list-group-item list-group-item-action bg-light">Portfolio</a>
                </div>
            </div>
        );

        if(this.props.accountType === "Manager"){
            return managerSidebar;
        }
        else if(this.props.accountType === "Customer"){
            return customerSidebar;
        }
        else{
            return <Redirect to='/' push={true}/>;
        }
    }
}

export default sidebar;