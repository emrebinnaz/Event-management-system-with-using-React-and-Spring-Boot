import React, { Component } from 'react';
import  {Chart}  from 'primereact/chart';
import { animateScroll } from "react-scroll";
 class EventBarChart extends Component {

    constructor(props) {
        super(props);

        this.basicData = {
            labels: this.props.labels,
            datasets: [
                {
                    label: this.props.label,
                    backgroundColor: '#42A5F5',
                    data: this.props.data
                },

            ]
        };
        this.options = this.getLightTheme();
    }

    getLightTheme() {
        let basicOptions = {
            legend: {
                labels: {
                    fontColor: '#3f51b5'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: '#495057',
                        min : 0
                    }
                }]
            }
        };

        return {
            basicOptions
        }
    }


     componentDidMount = () => {
         this.scrollToBottom();
     }

     scrollToBottom = () => {
         animateScroll.scrollToBottom({
             barChart: "options-holder"
         });
     }

    render() {
        const { basicOptions} = this.options;
        console.log(this.props);
        return (
            <div>
                <div className="card">
                    <h5>Etkinliklere Katılan Kişilerin Grafiği</h5>
                    <Chart type="bar"
                           className={"mt-5"}
                           data={this.basicData}
                           id = "barChart"
                           options={basicOptions} />
                </div>
            </div>
        )
    }
}
export default EventBarChart;