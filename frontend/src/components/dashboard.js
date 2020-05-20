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
    componentDidMount() {
        // console.log('Props: ' + this.props.location.search); // "?filter=top&origin=im"
    }


    render() {


        if(this.state.activeSession){
            return(
                <div className="d-flex" id="wrapper">
                    <Sidebar accountType={this.state.accountType}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <h1 className="mt-4">{this.props.title}</h1>
                            {this.props.content}
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return <Redirect to='/' push={true}/>;
        }
    }
}

export default dashboard;