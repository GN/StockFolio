import React from "react";
import {Redirect, Link} from "react-router-dom";

class sidebar extends React.Component{

    render() {

        const managerSidebar = (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <Link to='/dashboard'><a className="list-group-item list-group-item-action bg-light">Overview</a></Link>
                    {/*<a href="#" className="list-group-item list-group-item-action bg-light"><Link to='/dashboard/managestocks'>Manage Available Stocks</Link></a>*/}
                    <Link to='/dashboard/managecustomers'><a className="list-group-item list-group-item-action bg-light">Manage Customer</a></Link>
                </div>
            </div>

        );

        const customerSidebar = (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Customer Overview</div>
                <div className="list-group list-group-flush">
                    <a className="list-group-item list-group-item-action bg-light">Portfolio</a>
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