import React from 'react';
import { LineChart, Legend, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { MEASURE_DOLLARS, MEASURE_PERCENT} from './constants.js'
import { dateFormatter, percentageFormatter, dollarFormatter } from './utils.js';
import { interpolateRdYlGn } from 'd3-scale-chromatic'

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

  CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (this.props.measure === MEASURE_PERCENT) {
        return (
          <div style={styles.toolTip}>
            <p className="label">{`Date: ${dateFormatter(label)}`}</p>
            <p className="desc">{`Percent Gain: ${percentageFormatter(data.percentage_gain)}`}</p>
            <p className="desc">{`Net: ${dollarFormatter(data.net, 2)}`}</p>

          </div>
        )
      } else if (this.props.measure === MEASURE_DOLLARS) {
        return (
          <div style={styles.toolTip}>
            <p className="label">{`Date: ${dateFormatter(label)}`}</p>
            <p className="desc">{`Total Value: ${dollarFormatter(data.total_value, 2)}`}</p>
            <p className="desc">{`Total Cost: ${dollarFormatter(data.total_cost, 2)}`}</p>
            <p className="desc">{`Net: ${dollarFormatter(data.net, 2)}`}</p>
          </div>
        );
      }
    }

    return null;
  };

  legendFormatter = (value, entry, index) => {
    return value.split('_').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
  }

  render = () => {
    console.log(this.props.data)
    if (this.props.measure === MEASURE_PERCENT) {
      return (
        <LineChart width={500} height={300} data={this.props.data}>
          <XAxis
            dataKey='date'
            domain={['auto', 'auto']}
            name='Date'
            tickFormatter={dateFormatter}
          />
          <YAxis domain={['auto', 'auto']} tickFormatter={percentageFormatter} />
          <CartesianGrid stroke="#bbb" strokeDasharray="5 5" />
          <Tooltip content={this.CustomTooltip} />
          <Legend formatter={this.legendFormatter} />
          <Line type="monotone" dataKey="percentage_gain" stroke="#000" />
        </LineChart>
      )
    }
    else if (this.props.measure === MEASURE_DOLLARS) {
      return (
        <LineChart width={500} height={300} data={this.props.data}>
          <XAxis
            dataKey='date'
            domain={["auto", "auto"]}
            name='Date'
            tickFormatter={dateFormatter}
          />
          <YAxis domain={[0, 'auto']} tickFormatter={(t) => dollarFormatter(t, 0)} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip content={this.CustomTooltip} />
          <Legend formatter={this.legendFormatter} />
          <Line type="monotone" dataKey="total_value" stroke={interpolateRdYlGn(1)} />
          <Line type="monotone" dataKey="total_cost" stroke={interpolateRdYlGn(0)} />
        </LineChart>
      )
    }
    else {
      return <div></div>
    }
  }
}

export default Returns;