import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import axios from 'axios';

class DeleteStockModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            stock: '',
            shares: '',
            purchasePrice: '',
            id: '',
        }
    }


    getStockPrice(stock) {
        axios.get('https://cloud.iexapis.com/stable/stock/' + stock + '/batch?types=quote,news,chart&range=1m&last=10&token=pk_bf815fd81abf4a2da1d43edd6dc5f9ad')
            .then((response) => {
                console.log(response.data.quote.latestPrice);
                return response.data.quote.latestPrice;
            });
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    showModal(myBool){
        this.setState({showModal: myBool})
    }

    // addStock(){
    //     axios.post('/api/manager/AddStockToCustomerPortfolio', {ticker: this.props.stock, squantity: this.state.shares, price: this.state.price, customerEmail: this.props.email}).then((response) => {
    //         if(response.status === 200){
    //             console.log(response.data);
    //             this.showModal(false);
    //         }
    //     });
    // }

    getStock(){
        axios.get('/api/manager/GetStock', {params: {id: this.props.stockId}}).then((response) => {
            if(response.status === 200){
                console.log("get stock:");
                console.log(response.data);
                this.setState({id: response.data._id, stock: response.data.symbol, shares: response.data.quantity, purchasePrice: response.data.price})
            }
        });

    }

    updateStock(){
        axios.post('/api/manager/UpdatePortfolio', {deleteStock: false, quantity: this.state.shares, stock: this.state.stock, price: this.state.purchasePrice, id: this.state.id})
            .then((resposne) => {
                if(resposne.status === 200){
                    this.props.updateCustomerState();
                    this.showModal(false)
                }
            });
    }


    deleteStock(){
        axios.post('/api/manager/UpdatePortfolio', {deleteStock: true, id: this.state.id})
            .then((resposne) => {
                if(resposne.status === 200){
                    this.props.updateCustomerState();
                    this.showModal(false)
                }
            });
    }

    componentDidMount() {
        this.getStock();
    }


    render() {

        return (
            <>
                <>
                    <Button variant="primary" id={this.props.stockId} onClick={() => this.showModal(true)}>
                        Modify Customer Stock Purchase
                    </Button>

                    <Modal show={this.state.showModal} onHide={() => this.showModal(false)} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modify or Delete Customer Stock</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="stock">
                                    <Form.Label>Stock:</Form.Label>
                                    <Form.Control type="text" value={this.state.stock} disabled/>
                                </Form.Group>
                                <Form.Group controlId="shares">
                                    <Form.Label>Number of Shares:</Form.Label>
                                    <Form.Control type="number" defaultValue={this.state.shares} onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group controlId="purchasePrice">
                                    <Form.Label>Price Per Share:</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl defaultValue={this.state.purchasePrice} onChange={this.onChange}/>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => this.deleteStock()}>
                                Delete Stock
                            </Button>
                            <Button variant="primary" onClick={() => this.updateStock()}>
                                Update Stock
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </>
        );
    }
}
export default DeleteStockModal;