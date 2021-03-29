import React from "react";
import Chart, {ChartConfiguration} from 'chart.js';

export default class LineChart extends React.Component {
    state = {
        x: 0,
        y: 0,
        values: {
            x: 0,
            y: 0
        }
    }

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.fetchStatList()
        const {x, y, values} = this.state;
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'line',
            data: {
                datasets: [{
                    label: this.props.title,
                    backgroundColor: this.props.color,
                    borderColor: this.props.color,

                    data: values,

                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart.js Line Chart'
                },
                scales: {
                    xAxes: [{
                        display: true,

                    }],
                    yAxes: [{
                        display: true,

                    }]
                }
            }
        })
    }

    fetchStatList = async () => {

        let x = this.props.data.map(g => g.memtotal)
        let y = this.props.data.map(g => g.memused)

        let xVals = [];

        if (x) {
            x.map(g => {
                xVals.push(g.split("GB")[0])
            })
        }

        let yVals = [];

        if (y) {
            y.map(g => {
                yVals.push(g.split("GB")[0])
            })
        }

        let data = {
            x: xVals.join(","),
            y: yVals.join(",")
        }

        console.log(data)

        this.setState({values: data})
        setTimeout(this.fetchStatList, 5 * 1000);

    }

    render() {
        return <canvas ref={this.canvasRef}/>;
    }
}