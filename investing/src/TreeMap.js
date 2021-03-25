import React from 'react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { interpolateRdYlGn } from 'd3-scale-chromatic'

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

class CustomizedContent extends React.PureComponent {
  render() {
    const { root, depth, x, y, width, height, index, payload, colors, rank, name, max, min, measure } = this.props;
    const net_gain = this.props[measure]
    // const net_gain = (this.props['Total Value'] - this.props['Total Cost']) / this.props['Total Cost']
    var v;
    if (net_gain > 0) {
      v = ((net_gain / max) * .5) + .5
    } else {
      v = .5 - ((net_gain / min) * .5)
    }
    const color = interpolateRdYlGn(v)
    const font_color = Math.abs(v - .5) < .2 ? "#000" : "#fff"

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: color,
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
          <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill={font_color} fontSize={14}>
            {name}
          </text>
     
      </g>
    );
  }
}

class TreeMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: true
    }
  }

  componentDidMount = () => {
 
  }

  renderCustomLabel = (section) => {
    return (
    <text x={section.x} y={section.y} textAnchor={section.x > section.cx ? 'start' : 'end'} dominantBaseline="central">
      { section.Symbol }
    </text>
    )
  }

  CustomTooltip = (props) => {
    if (props.active && props.payload && props.payload.length) {
      return (
        <div className="custom-tooltip" style={{backgroundColor: 'white', padding: 10, border: 'solid 1px #000'}}>
          <p className="label">{props.payload[0].name}</p>
          <p className="label">Shares Owned: {props.payload[0].payload.Quantity.toFixed(3)}</p>
          <p className="intro">Latest Price: {props.payload[0].payload['Latest Price'].toFixed(2)}</p>
          <p className="intro">Cost Basis: {props.payload[0].payload['Average Cost'].toFixed(2)}</p>
          <p className="intro">Total Value: {props.payload[0].payload['Total Value'].toFixed(2)}</p>
          <p className="intro">Total Cost: {props.payload[0].payload['Total Cost'].toFixed(2)}</p>
          {/* <p className="desc">Anything you want can be displayed here.</p> */}
        </div>
      );
    }
  
    return null;
  };

  render = () => {
    const measure = this.state.percentage ? "percentage_gain" : 'net_gain'
    const max = Math.max.apply(Math, this.props.holdings.map(el => { return el[measure] }))
    const min = Math.min.apply(Math, this.props.holdings.map(el => { return el[measure] }))

    const tree = (<Treemap
      // width={730}
      // height={500}
      data={this.props.holdings}
      dataKey="Total Value"
      nameKey="Symbol"
      ratio={4 / 3}
      label={true}

      // stroke="#fff"
      // fill="#8884d8"
      isAnimationActive={false}
      // onMouseEnter={(e) => console.log(e)}
      content={<CustomizedContent colors={COLORS} max={max} min={min} measure={measure}/>}
    >
              <Tooltip content={this.CustomTooltip} />
    </Treemap>)

    return (
      <div style={{ height: 800, width: 800 }}>
        <ResponsiveContainer height="100%" width="100%">
          {tree}
        </ResponsiveContainer>
      </div>
    )
  }
}

export default TreeMap;