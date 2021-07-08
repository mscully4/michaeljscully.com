import React, {Component} from 'react';

import Main from "./components/Main.js"
import './App.css';
import { city_colors, place_colors, ICE_BLUE, OFF_BLACK_1 } from "./utils/Colors.js"
import { API_BASE, API_DESTINATIONS, API_PLACES, API_PHOTOS, API_ALBUMS } from "./utils/Constants"


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      destinations: [],
      places: {},
      albums: {},
      photos: {},

      ready: false,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);

    fetch(API_DESTINATIONS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((resp) => {

      resp.json().then(json => {
      
        var destinations = json.map((el, i) => {
          return {
            index: i,
            color: city_colors[Math.floor(Math.random() * city_colors.length)],
            ...el,
            type: parseInt(el.type),
            latitude: parseFloat(el.latitude),
            longitude: parseFloat(el.longitude)
          }
        })
        this.setState({
          destinations: destinations,
          ready: true

        }, () => {

          var placeCounter = 0;
          this.state.destinations.forEach((dest) => {

            //Retrieve Place Data
            fetch(`${API_PLACES}?destination_id=${dest.destination_id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then((resp) => {

              resp.json().then(json => {

                var lst = this.state.places[dest.destination_id] || []
                json.forEach((place) => {
                  place.color = place_colors[Math.floor(Math.random() * place_colors.length)]
                  place.latitude = parseFloat(place.latitude)
                  place.longitude = parseFloat(place.longitude)
                  place.index = ++placeCounter
                  lst.push(place)
                })
                  
                this.setState({
                  places: {
                    ...this.state.places,
                    [dest.destination_id]: lst,
                  }
                })
              })
            })

            // Retrieve Photo Information
            fetch(`${API_PHOTOS}?destination_id=${dest.destination_id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then((resp) => {
              resp.json().then(json => {
                json.forEach((obj) => {
                  var lst = []
                  obj.photos.map(photo => {
                    photo.height = parseInt(photo.height)
                    photo.width = parseInt(photo.width)
                    lst.push(photo)
                  })
                
                  if (lst.length > 0) {
                    this.setState({
                      photos: {
                        ...this.state.photos,
                        [dest.destination_id]: {
                          ...this.state.photos[dest.destination_id],
                            //Have to get the place_id from the first list element, not ideal
                            [lst[0].place_id]: lst
                        }
                      }
                    })
                  }
                })
              })
            })

            // Retrieve Album Information
            fetch(`${API_ALBUMS}?destination_id=${dest.destination_id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then((resp) => {
              resp.json().then((json) => {
                json.forEach((album) => {
                  this.setState({
                    albums: {
                      ...this.state.albums,
                      [dest.destination_id]: {
                        ...this.state.albums[dest.destination_id],
                        [album.place_id]: album
                      }
                    }
                  })
                })
              })
            })

          })
        })
      })
    })
  }

  render() {
    return (
      <Main
        ready={this.state.ready}
        destinations={this.state.destinations}
        places={this.state.places}
        photos={this.state.photos}
        albums={this.state.albums}
      />
    )
  }
}

export default App;
