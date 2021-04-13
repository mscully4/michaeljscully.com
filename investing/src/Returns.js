import React from 'react';
import { LineChart, Legend, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MEASURE_DOLLARS, MEASURE_PERCENT } from './constants.js'
import { dateFormatter, percentageFormatter, dollarFormatter } from './utils.js';
import { interpolateRdYlGn } from 'd3-scale-chromatic'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Chart from "react-apexcharts";


const styles = {
  toolTip: {
    padding: "5px 10px",
    backgroundColor: "#fff",
    border: 'solid 2px #ccc',
    boxShadow: '0 0 3px #ccc'
  }
};

class Returns extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render = () => {
    const classes = this.props.classes;
    const measure = this.props.measure;

    let chartSeries = [{
      name: 'Total Return',
    }];

    let chartOptions = {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      title: {
        text: null,
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        labels: {
          formatter: null
        },
        title: {
          text: null
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: true,
        y: {
          formatter: null
        }
      },
      colors: ["#000"]
    }

    if (measure === MEASURE_PERCENT) {
      const data = this.props.data.map((value) => {
        return [value.date, value.percentage_gain]
      })

      chartSeries[0].data = data;

      chartOptions.title.text = "Total Return in Percent"
      chartOptions.tooltip.y.formatter = (x) => percentageFormatter(x, 2)
      chartOptions.yaxis.labels.formatter = (x) => percentageFormatter(x, 0)
      chartOptions.yaxis.title = "Percent"

      return (
        <ResponsiveContainer height={"100%"} width={"100%"}>
          <Chart options={chartOptions} series={chartSeries} type="area" />
        </ResponsiveContainer>
      )
    }
    else if (measure === MEASURE_DOLLARS) {
      const data = this.props.data.map((value) => {
        return [value.date, value.total_value - value.total_cost]
      })

      chartSeries[0].data = data;

      chartOptions.title.text = "Total Return in Dollars"
      chartOptions.tooltip.y.formatter = (x) => dollarFormatter(x, 2)
      chartOptions.yaxis.labels.formatter = (x) => dollarFormatter(x, 2)
      chartOptions.yaxis.title = "Dollars"

      return (
        <ResponsiveContainer height={"100%"} width={"100%"}>
          <Chart options={chartOptions} series={chartSeries} type="area" />
        </ResponsiveContainer>
      )
    }
    else {
      return (<div></div>)
    }
  }
}
export default withStyles(styles)(Returns);
