import React from 'react';
import { LineChart, Legend, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { dateFormatter } from './utils.js';
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
      percentage: true
    }
  }

  CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={styles.toolTip}>
          <p className="label">{`Date: ${dateFormatter(label)}`}</p>
          <p className="desc">{`Total Value: $${data.total_value}`}</p>
          <p className="desc">{`Total Cost: $${data.total_cost}`}</p>
          <p className="desc">{`Net: $${data.net}`}</p>
        </div>
      );
    }
  
    return null;
  };

  render = () => {
    return (
      <LineChart width={500} height={300} data={this.props.data}>
        <XAxis
          dataKey='Date'
          domain={['auto', 'auto']}
          name='Date'
          tickFormatter={dateFormatter}
        />
        <YAxis domain={[0, 'auto']} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip content={this.CustomTooltip}/>
        <Legend />
        <Line type="monotone" dataKey="Total Cost" stroke={interpolateRdYlGn(0)} />
        <Line type="monotone" dataKey="Total Value" stroke={interpolateRdYlGn(1)} />
      </LineChart>
    )
  }
}

export default Returns;