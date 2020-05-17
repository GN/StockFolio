import React from "react";
import {Line} from "react-chartjs-2";
import axios from 'axios'
import {Jumbotron} from "react-bootstrap";

class Linechart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ticker: this.props.ticker,
            labels: [],
            datasets: [],
            stockName: ''
        }
    }

    updateTicker(tick){
        this.setState({ticker: tick});
    }

    getChartStuff(){
        axios.get('https://cloud.iexapis.com/stable/stock/' + this.state.ticker + '/batch?types=quote,news,chart&range=1m&last=10&token=pk_bf815fd81abf4a2da1d43edd6dc5f9ad')
            .then((response) =>{
                let high = {label: 'Daily High',
                    data: [],
                    fill: false,
                    borderColor: "green",
                    backgroundColor: "green",
                    pointBackgroundColor: "green",
                    pointBorderColor: "green",
                    pointHoverBackgroundColor: "green",
                    pointHoverBorderColor: "green"};
                let low = {label: 'Daily Low',
                    data: [],
                    fill: false,
                    borderColor: "red",
                    backgroundColor: "red",
                    pointBackgroundColor: "red",
                    pointBorderColor: "red",
                    pointHoverBackgroundColor: "red",
                    pointHoverBorderColor: "red"};
                let label = [];
                let datasets = [];
                console.log(response.data);
                for(let i = 0; i < 7; i++){
                    label.push(response.data.chart[i].date);
                    high.data.push(response.data.chart[i].high);
                    low.data.push(response.data.chart[i].low);
                }
                datasets.push(high, low);
                this.setState({labels: label, datasets: datasets, stockName: response.data.quote.companyName});
            })
    };

    componentDidMount(){
        this.getChartStuff();
    }

    render() {
        if(this.state.ticker !== null){
            return (
                <Jumbotron>
                    <Line
                        data={{labels: this.state.labels, datasets: this.state.datasets}}
                        options={{
                            title:{
                                display:true,
                                text:'7 Day Average(s) for: ' + this.state.stockName +' (' + this.state.ticker + ')',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                        }}
                    />
                </Jumbotron>
            );
        }
        else{return <></>;}
    }

}
export default Linechart;