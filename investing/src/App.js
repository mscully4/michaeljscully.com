import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import TreeMap from './TreeMap.js'
import Returns from './Returns.js'

const BASE_URL = 'http://localhost:8000/api/investing'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      positions: null,
      returns: null,
      transfers: null
    }
  }

  componentDidMount = () => {
    //Get positions data
    fetch(BASE_URL + "/positions").then(res => {
      res.json().then(data => {
        if (!this.state.data) {
          var holdings = JSON.parse(data.holdings).map(element => {
            const net_gain = element['Total Value'] - element['Total Cost'];
            return {
              ...element,
              name: element['Symbol'],
              net_gain: net_gain,
              percentage_gain: net_gain / element['Total Cost']
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
            return {
              ...el,
              total_value: el['Total Value'].toFixed(2),
              total_cost: el['Total Cost'].toFixed(2),
              net: (el['Total Value'] - el['Total Cost']).toFixed(2),
              Date: new Date(el.Date),
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
        const treeMap = (<TreeMap holdings={this.state.holdings}/>)
        const returns = (<Returns data={this.state.returns}/>)
        return returns
    } else {
      return <div></div>
    }
  }
}

export default App;
