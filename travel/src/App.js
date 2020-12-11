import React, {Component} from 'react';

import Main from "./components/Main.js"
import './App.css';
import {city_colors} from "./utils/Colors.js"

const S3_ENDPOINT = 'https://mscully-travel-map.s3.us-east-2.amazonaws.com/data.json'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth * .8,
      height: window.innerHeight * .8,

      cities: [],
      places: [],

      ready: false,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);

    fetch(S3_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((resp) => {
      return resp.json()
    }).then((json) => {
      this.setState({
        cities: this.compileCities(json.destinations),
        places: this.compilePlaces(json.destinations),
        ready: true
      })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth * .8, height: window.innerHeight * .8 });
  }

  compileCities = (destinations) => {
    var place_index = 0
    return destinations.map((val, i) => {
      var places = val.places.map((el, x) => {
        return {
          ...el,
          index: x
        }
      })

      return {
        ...val,
        index: i,
        color: city_colors[Math.floor(Math.random() * city_colors.length)],
        places: places
      }
    })
  }

  compilePlaces = (destinations) => {
    let places = [], index = 0
    for (var i = 0; i < destinations.length; ++i) {
      for (var z = 0; z < destinations[i].places.length; ++z) {
        var place = destinations[i].places[z];
        place.images = place.images.map((obj, i) => {
          return { ...obj, index: i, boof: "dsf" }
        })
        places.push({ ...place, index })
        ++index
      }
    }
    return places
  }

  render() {
    if (this.state.ready) {
      return (
        <div className="App">
          <Main 
          ready={this.state.ready}
          cities={this.state.cities}
          places={this.state.places}
          user={"michael"}
          />
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default App;
