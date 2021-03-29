import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import TreeMap from './TreeMap.js'
import Returns from './Returns.js'

import { MEASURE_DOLLARS, MEASURE_PERCENT, BASE_URL } from './constants.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      positions: null,
      returns: null,
      transfers: null,

      // measure: MEASURE_PERCENT,
      measure: MEASURE_DOLLARS
    }
  }

  componentDidMount = () => {
    //Get positions data
    fetch(BASE_URL + "/positions").then(res => {
      res.json().then(data => {
        if (!this.state.data) {
          var holdings = JSON.parse(data.holdings).map(element => {
            const net = element.total_value - element.total_cost;
            return {
              ...element,
              net: net,
              percentage_gain: net / element.total_cost
            }
          });
          this.setState({
            holdings: holdings
          })
        }
      })
    })

    //Get returns data
    fetch(BASE_URL + '/returns').then(res => {
      res.json().then(data => {
        this.setState({
          returns: JSON.parse(data.returns).map(el => {
            const net = el.total_value - el.total_cost
            return {
              ...el,
              // total_value: el.total_value,
              // total_cost: el.total_cost,
              net: net,
              percentage_gain: (net / el.total_cost) * 100,
              date: new Date(el.date),
            }
          })
        })

      })
    })

    //Get transfers data
    fetch(BASE_URL + '/transfers').then(res => {
      res.json().then(data => {
        this.setState({
          transfers: JSON.parse(data.transfers)
        })
      })
    })
  }

  render = () => {
    if (this.state.holdings) {
        return <div>
          <TreeMap holdings={this.state.holdings} measure={this.state.measure}/>
          <Returns data={this.state.returns} measure={this.state.measure} />
        </div>
    } else {
      return <div></div>
    }
  }
}

export default App;
