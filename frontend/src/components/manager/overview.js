import React, {Component} from "react";
import {ListGroup, Form, Button} from "react-bootstrap";
import axios from 'axios';
import {getSession} from '../../actions/session';
import Linechart from "../partials/linechart";

class managerOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: "",
            currentStocks: [],
        }
        this.onClick = this.viewStock.bind(this);

    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    getStocks() {
        axios.get('/api/manager/GetCurrentAvailable', {params: {'email': getSession().email}})
            .then((response) =>{
                this.setState({currentStocks: response.data});
            });
    };

    addStock() {
        axios.post('/api/manager/AddAvailableStock', {email: getSession().email, ticker: this.state.ticker})
            .then((response) => {
                if(response.status === 200){
                    this.getStocks();
                }
            })
    };

    viewStock(e){
        e.preventDefault();
        console.log(e.target.id);
        this.setState({ticker: e.target.id});
        console.log('ticker' + this.state.ticker);

    };


    componentDidMount(){
        this.getStocks();
    }

    render() {
        return(
            <>

                <div>
                    <p>Here is a list of your current holdings and available statistics regarding them:</p>
                    <ListGroup id="stocks">
                        {this.state.currentStocks.map(stock => (
                            <ListGroup.Item key={stock} id={stock} onClick={this.viewStock}>
                                {stock}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                <div>
                    <Form className={"pt-5"} onSubmit={() => this.addStock()}>
                        <Form.Group controlId="ticker" onChange={() => this.onChange()} value={this.state.ticker}>
                            <Form.Label>Quick Add New Stock</Form.Label>
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
                    <Linechart ticker={this.state.ticker}/>
                </div>
            </>
        );
    }
}

export default managerOverview;