import React from "react";
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import {getSession} from "../../actions/session";

class Availablestocks extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            currentStocks: []
        }
    }

    getStocks() {
        axios.get('/api/manager/GetCurrentAvailable', {params: {'email': getSession().email}})
            .then((response) =>{

                let stocks = [];

                var self = this;

                response.data.forEach(function(d){

                    let button = <button type="button" className="btn btn-danger" id={d} onClick={self.deleteStock}>Delete</button>;
                    stocks.push({symbol: d, edit: 'edit', delete: button})
                });

                this.setState({currentStocks: stocks});
            });
    };

    componentDidMount(){
        this.getStocks();
    }

    deleteStock = (e) => {

        console.log("Stock to delete: " + e.target.id);

        axios.post('/api/manager/RemoveStock', {email: getSession().email, ticker: e.target.id})
            .then((response) => {
                if(response.status === 200){
                    this.getStocks();
                }
            })
    };

    render() {
        const data = {
            columns: [
                {
                    label: 'Symbol',
                    field: 'symbol',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Delete',
                    field: 'delete',
                    width: 150
                }
            ],
            rows: this.state.currentStocks
        };

        return (
            <>
                <MDBDataTable
                    striped
                    bordered
                    small
                    data={data}
                />
            </>
        );
    }


}
export default Availablestocks;