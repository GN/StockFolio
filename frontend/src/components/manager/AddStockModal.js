import React from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import axios from 'axios';

class AddStockModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            shares: 1,
            price: 10
        }
    }


    getStockPrice(stock) {
        axios.get('https://cloud.iexapis.com/stable/stock/' + stock + '/batch?types=quote,news,chart&range=1m&last=10&token=pk_bf815fd81abf4a2da1d43edd6dc5f9ad')
            .then((response) => {
                return response.data.quote.latestPrice;
            });
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    showModal(myBool){
        this.setState({showModal: myBool})
    }

    addStock(){
        axios.post('/api/manager/AddStockToCustomerPortfolio', {ticker: this.props.stock, squantity: this.state.shares, price: this.state.price, customerEmail: this.props.email}).then((response) => {
            if(response.status === 200){
                console.log(response.data);
                this.showModal(false)
                this.props.updateCustomerState();
            }
        });
    }


    render() {

        return (
            <>
                <>
                    <Button variant="primary" onClick={() => this.showModal(true)}>
                        Add Stock to Customer Portfolio
                    </Button>

                    <Modal show={this.state.showModal} onHide={() => this.showModal(false)} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Stock</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="stock">
                                    <Form.Label>Stock:</Form.Label>
                                    <Form.Control type="text" value={this.props.stock} disabled/>
                                </Form.Group>
                                <Form.Group controlId="shares">
                                    <Form.Label>Number of Shares:</Form.Label>
                                    <Form.Control type="number" defaultValue="1" onChange={this.onChange}/>
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Price Per Share:</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl defaultValue='10' onChange={this.onChange}/>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.showModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => this.addStock()}>
                                Add Stock
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </>
        );
    }
}
export default AddStockModal;