import React from 'react';
import './App.css';
import Main from './components/Main'
import { API_URL } from './utils/constants'

function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
  }

  componentDidMount = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(json => {
      json.map(obj => {
        obj.width = parseInt(obj.width);
        obj.height = parseInt(obj.height)
        return obj
      })
      this.setState({
        images: getRandomSubarray(json, 40)
      })
    })
  }

  render() {
    return <Main images={this.state.images} />
  }
}

export default App;
