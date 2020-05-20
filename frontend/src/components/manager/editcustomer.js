import React from "react";
import {MDBDataTable} from "mdbreact";
import axios from "axios";
import {getSession} from "../../actions/session";
import {Button} from "react-bootstrap";
import AddStockModal from './AddStockModal'
import DeleteStockModal from "./DeleteStockModal";

class Editcustomer extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            customerData: [],
            availableStockData: [],
            customerName: ''
        }
    }

    useQuery() {
        return new URLSearchParams(window.location.search);
    }



    getStocks() {
        axios.get('/api/manager/GetCurrentAvailable', {params: {'email': getSession().email}})
            .then((response) =>{

                let query = this.useQuery();
                let stocks = [];
                var self = this;

                response.data.forEach(function(d){
                    let deleteBtn = <Button variant="danger" id={d} onClick={self.deleteStock}>Delete</Button>;
                    let detailsBtn = <Button variant="success" id={d} onClick={self.setClickTicker}>View Stock Detail</Button>;
                    let addBtn = <AddStockModal stock={d} email={query.get('email')} updateCustomerState={self.updateCustomerState}/>;

                    stocks.push({symbol: d, edit: 'edit', delete: deleteBtn, addToCustomerPortfolio: addBtn, viewDetails: detailsBtn})
                });

                this.setState({availableStockData: stocks});
            });
    };

    getCustomerPortfolio () {
        let query = this.useQuery();
        var self = this;
        let stockPortfolio = [];
        this.setState({customerData: []});
        axios.get('/api/manager/GetCustomerPortfolio', {params: {'email': query.get('email')}})
            .then((response) => {
                response.data.forEach(function(stock){
                    let editBtn = <DeleteStockModal stockId={stock._id} updateCustomerState={self.updateCustomerState}/>;
                    stockPortfolio.push({companyName: stock.symbol, numberOfShares: stock.quantity, purchasePrice: stock.price, viewStockDetails: "test", editOrRemove: editBtn})
                });
                this.setState({customerData: stockPortfolio})
            });
    }

    getCustomerName(){
        let query = this.useQuery();
        axios.get('/api/manager/GetCustomerName', {params: {'email': query.get('email')}})
            .then((response) => {
                this.setState({customerName: response.data})
            });
    }

    updateCustomerState = () => {
        this.getCustomerPortfolio();
        this.getCustomerName();
    };


    componentDidMount() {
        this.getStocks();
        this.getCustomerPortfolio();
        this.getCustomerName();

    }


    render() {

        const customerData = {
            columns: [
                {
                    label: 'Company Name',
                    field: 'companyName',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Number of Shares',
                    field: 'numberOfShares',
                    width: 150
                },
                {
                    label: 'Purchase Price',
                    field: 'purchasePrice',
                    width: 150
                },
                {
                    label: 'View Stock Details',
                    field: 'viewStockDetails',
                    width: 150
                },
                {
                    label: 'Edit or Remove Stock',
                    field: 'editOrRemove',
                    width: 150
                }
            ],
            rows: this.state.customerData
        };

        const availableData = {
            columns: [
                {
                    label: 'Symbol',
                    field: 'symbol',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'View Details',
                    field: 'viewDetails',
                    width: 150
                },
                {
                    label: 'Add to Customer Portfolio',
                    field: 'addToCustomerPortfolio',
                    width: 150
                }
            ],
            rows: this.state.availableStockData
        };



        return (
            <>
                <h2 className={"pt-5"}>Portfolio for:  {this.state.customerName}</h2>
                <MDBDataTable id='customerPortfolioTable' entriesOptions={[3, 5, 10, 15, 20]} entries={3}
                    striped
                    bordered
                    small
                    data={customerData}
                />
                <h2 className={"pt-5"}>Available Stocks</h2>
                <MDBDataTable id='availableStockTable' entriesOptions={[3, 5, 10, 15, 20]} entries={3}
                    striped
                    bordered
                    small
                    data={availableData}
                />
            </>
        );
    }


}

export default Editcustomer;