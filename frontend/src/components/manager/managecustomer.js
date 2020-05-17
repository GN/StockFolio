import React from "react";
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import {getSession} from "../../actions/session";
import {Button} from "react-bootstrap";

class Managecustomer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }

    getCustomers(){
        axios.get('/api/manager/GetCustomers', {params: {email: getSession().email}})
            .then((response) => {
                let cust = [];
                var self = this;
                response.data[0].customerObjects.forEach(function(customer){
                    let button = <Button id={customer.email} variant="warning" onClick={self.editCustomer}>Edit Portfolio</Button>;
                    cust.push({customerName: customer.name, customerEmail: customer.email, editCustomer: button})
                });
                this.setState({customers: cust});
                console.log(this.state.customers);
            });
    }

    componentDidMount() {
        this.getCustomers();
    }

    editCustomer(){}

    render() {
        const data = {
            columns: [
                {
                    label: 'Customer Name',
                    field: 'customerName',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Customer Email',
                    field: 'customerEmail',
                    width: 150
                },
                {
                    label: 'Edit Customer Portfolio',
                    field: 'editCustomer',
                    width: 150
                }
            ],
            rows: this.state.customers
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
export default Managecustomer;