import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import Home from './test.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount = () => {
    fetch("http://localhost:8000/api/investing").then(res => {
      res.json().then(data => {
        if (!this.state.data) {
          var holdings = JSON.parse(data.holdings).map(element => {
            return {
              ...element,
              name: element['Symbol'],
              value: element['Total Value']
            }
          });
          this.setState({
            holdings: holdings
          })
        }
      })
    })
  }


render = () => {
  if (this.state.holdings) {
    return (
          <Home 
            holdings={this.state.holdings}
          />
    )
    } else {
      return <div></div>
    }
}
}

export default App;
