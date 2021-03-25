import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import moment from 'moment'

class Returns extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: true
    }
  }

  render = () => {

    return (
      <LineChart width={500} height={300} data={this.props.data}>
        <XAxis
          dataKey='Date'
          domain={['auto', 'auto']}
          name='Date'
          tickFormatter={(unixTime) => moment(unixTime).format('M-D-Y')}
        />
        <YAxis domain={['auto', 'auto']} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="Total Cost" stroke="#8884d8" />
        <Line type="monotone" dataKey="Total Value" stroke="#82ca9d" />
        <Line type="monotone" dataKey="net" stroke="#82ca9d" />
      </LineChart>
    )
  }
}

export default Returns;