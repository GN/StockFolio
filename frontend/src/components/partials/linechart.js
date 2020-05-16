import React from "react";
import {Line} from "react-chartjs-2";
import axios from 'axios'


class linechart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ticker: this.props.ticker
        }
    }


    getChartStuff(){
        axios.get('https://cloud.iexapis.com/stable/stock/' + this.state.ticker + '/batch?types=quote,news,chart&range=1m&last=10&token=pk_bf815fd81abf4a2da1d43edd6dc5f9ad')
            .then((response) =>{
                console.log(response.data);
            })
    };

    componentDidMount(){
        this.getChartStuff();
    }

    render() {

        this.getChartStuff();
        const data = {
            labels: [],
            datasets: []
        };
        return (
            <div>
                <Line
                    data={data}
                    options={{
                        title:{
                            display:true,
                            text:'7 Day Average(s) for: ' + this.state.ticker,
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
            </div>
        );
    }

}
export default linechart;