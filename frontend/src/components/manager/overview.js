import React, {Component} from "react";
import {Form, Button} from "react-bootstrap";
import axios from 'axios';
import {getSession} from '../../actions/session';
import Linechart from "../partials/linechart";
import { MDBDataTable } from 'mdbreact';


class managerOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: "",
            currentStocks: [],
            clickTicker: null
        };
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    getStocks() {
        axios.get('/api/manager/GetCurrentAvailable', {params: {'email': getSession().email}})
            .then((response) =>{

                let stocks = [];
                var self = this;

                response.data.forEach(function(d){
                    let deleteBtn = <Button variant="danger" id={d} onClick={self.deleteStock}>Delete</Button>;
                    let detailsBtn = <Button variant="success" id={d} onClick={self.setClickTicker}>View Stock Detail</Button>;
                    stocks.push({symbol: d, edit: 'edit', delete: deleteBtn, viewDetails: detailsBtn})
                });

                this.setState({currentStocks: stocks});
            });
    };

    addStock() {
        axios.post('/api/manager/AddAvailableStock', {email: getSession().email, ticker: this.state.ticker.toUpperCase()})
            .then((response) => {
                if(response.status === 200){
                    this.getStocks();
                }
            })
    };

    setClickTicker = (e) => {
        console.log('Old Ticker: ' + this.state.clickTicker);
        this.setState({ clickTicker: e.target.id },() => {
            console.log("New Ticker: " + this.state.clickTicker);
        });
    };

    deleteStock = (e) => {

        console.log("Stock to delete: " + e.target.id);

        axios.post('/api/manager/RemoveStock', {email: getSession().email, ticker: e.target.id})
            .then((response) => {
                if(response.status === 200){
                    this.getStocks();
                }
            })
    };

    componentDidMount(){
        this.getStocks();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps);
        console.log(prevState);
        console.log(snapshot);
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
                    label: 'Delete',
                    field: 'delete',
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
                    <p>Quick View Your Managed Stocks:</p>
                        <MDBDataTable
                            striped
                            bordered
                            small
                            data={data}
                        />

                </div>
                <div>
                    <Form className={"pt-5"} onSubmit={() => this.addStock()}>
                        <Form.Group controlId="ticker" onChange={this.onChange} value={this.state.ticker}>
                            <Form.Label>Add New Stock</Form.Label>
                            <Form.Control type="tickerBox" placeholder="GOOG" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Stock
                        </Button>
                    </Form>
                </div>

                    <div className={"pt-5"} id='chart'>
                        <Linechart ticker={this.state.clickTicker} key={this.state.clickTicker} />
                    </div>
            </>
        );
    }
}

export default managerOverview;