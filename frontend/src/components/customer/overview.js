import React, {Component} from "react";
import {Button} from "react-bootstrap";
import axios from 'axios';
import Linechart from "../partials/linechart";
import { MDBDataTable } from 'mdbreact';
import {getSession} from "../../actions/session";
import yahooStockPrices from 'yahoo-stock-prices'


class CustomerOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: "",
            currentStocks: [],
            clickTicker: null,
        };
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };


    setClickTicker = (e) => {
        console.log('Old Ticker: ' + this.state.clickTicker);
        this.setState({ clickTicker: e.target.id },() => {
            console.log("New Ticker: " + this.state.clickTicker);
        });
    };

    getStocks() {
        axios.get('/api/manager/GetCustomerPortfolio', {params: {'email': getSession().email}})
            .then((response) =>{
                // let buy_prices=0;
                // let current_prices = 0;
                let stocks = [];
                var self = this;

                response.data.forEach(function(d){
                    let detailsBtn = <Button variant="success" id={d.symbol} onClick={self.setClickTicker}>View Stock Detail</Button>;
                    stocks.push({symbol: d.symbol, quantityOwned: d.quantity, pricePurchasedAt: d.price, viewDetails: detailsBtn})
                    yahooStockPrices.getCurrentPrice('AAPL', function(err, price){

                        console.log(price);

                    });
                });

                this.setState({currentStocks: stocks});
            });
    };

    setClickTicker = (e) => {
        console.log('Old Ticker: ' + this.state.clickTicker);
        this.setState({ clickTicker: e.target.id },() => {
            console.log("New Ticker: " + this.state.clickTicker);
        });
    };

    componentDidMount(){
        this.getStocks();
    }

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
                    label: 'Quantity Owned',
                    field: 'quantityOwned',
                    width: 150
                },
                {
                    label: 'Price Purchased At',
                    field: 'pricePurchasedAt',
                    width: 150
                },
                {
                    label: 'View Details',
                    field: 'viewDetails',
                    width: 150
                }
            ],
            rows: this.state.currentStocks
        };
        return(
            <>
                <div>
                    <p>Your Portfolio:</p>
                    <MDBDataTable
                        striped
                        bordered
                        small
                        data={data}
                    />

                </div>

                <div className={"pt-5"} id='chart'>
                    <Linechart ticker={this.state.clickTicker} key={this.state.clickTicker} />
                </div>
            </>
        );
    }
}

export default CustomerOverview;