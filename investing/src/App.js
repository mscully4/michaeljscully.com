import React from 'react';
// import './App.css';

import { withStyles } from '@material-ui/core/styles';
import Home from './Home.js'

// import Grid from '@material-ui/core/Grid';

import { BASE_URL } from './constants.js'

const styles = {
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      positions: null,
      returns: null,
      transfers: null,
    }
  }

  componentDidMount = () => {
    //Get positions data
    fetch(BASE_URL + "/positions").then(res => {
      res.json().then(data => {
        if (!this.state.data) {
          var positions = JSON.parse(data.holdings).map(element => {
            const net = element.total_value - element.total_cost;
            return {
              ...element,
              net: net,
              percentage_gain: net / element.total_cost
            }
          });
          this.setState({
            positions: positions
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
          transfers: JSON.parse(data.transfers).map((el) => {
            el.net_amount = parseInt(el.net_amount)
            el.date = new Date(el.date)
            return el
          })
        })
      })
    })

    //Get account info
    fetch(BASE_URL + "/account").then(res => {
      res.json().then(data => {
        const account = JSON.parse(data.account);
        console.log(account)
        this.setState({
          account: {
            ...account,
            long_market_value: parseFloat(account.long_market_value),
            cash: parseFloat(account.cash),
            equity: parseFloat(account.equity)
          }
        })
      })
    })

  }

  render = () => {
    return (
      <Home 
      positions={this.state.positions}
      returns={this.state.returns}
      transfers={this.state.transfers}
      account={this.state.account}
      />
    )
  }
}

export default withStyles(styles)(App);
