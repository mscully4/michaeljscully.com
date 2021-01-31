import React, {Component} from 'react';

import Main from "./components/Main.js"
import './App.css';
import { city_colors, place_colors } from "./utils/Colors.js"
import { shuffle } from './utils/Formulas'

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
    let placeIndex = 0;
    return shuffle(destinations.map((val, i) => {
      var places = val.places.map((el, x) => {
        return {
          ...el,
          images: el.images.map((obj, i) => { return {...obj, index: i}}),
          color: place_colors[Math.floor(Math.random() * place_colors.length)],
          index: placeIndex++
        }
      })

      return {
        ...val,
        index: i,
        color: city_colors[Math.floor(Math.random() * city_colors.length)],
        places: places
      }
    }))
  }

  render() {
    if (this.state.ready) {
      let places = []
      this.state.cities.forEach(el => {
        el.places.forEach(place => {
          places.push(place)
        })
      })
      
      return (
        <div className="App">
          <Main 
          ready={this.state.ready}
          cities={this.state.cities}
          places={places}
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
