import React from 'react';
import Gallery from "react-photo-gallery";
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx'
import RingLoader from "react-spinners/RingLoader";
import { PropTypes } from 'prop-types'

import Navigation from '../components/Navigation'
import Map from '../components/Map.js';
import Table from '../components/Table.js'
import ImageViewer from '../components/ImageViewer'
import { place_colors, city_colors, FONT_GREY, ICE_BLUE, OFF_BLACK_1, OFF_BLACK_2, OFF_BLACK_3, OFF_BLACK_5 } from '../utils/Colors';
import { getDistanceBetweenTwoPoints } from '../utils/Formulas';
import { API_BASE, API_DESTINATIONS, API_PLACES, API_PHOTOS, API_ALBUMS } from "../utils/Constants"


import { DEFAULT_CENTER, GRANULARITY_CUTOFF } from '../utils/Constants'

const styles = theme => ({
  page: {
    backgroundColor: OFF_BLACK_5,
    color: FONT_GREY,
    paddingBottom: '10vh'
  },
  main: {
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "3fr 2fr",
    width: '90vw',
    marginLeft: '7.5vw',
    boxShadow: `0 0 20px ${OFF_BLACK_1}`
  },
  modalContent: {
    border: 'none',
    height: '100%',
    backgroundColor: "transparent"
  },
  infoDiv: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '6fr 4fr',
    height: '20vh',
    alignItems: 'center'
  },
  title: {
    color: ICE_BLUE,
    fontFamily: 'aguafina-script',
    fontSize: '5vw',
    paddingLeft: "20%", 
    margin: 0
  },
  factDiv: {
    fontSize: '1.5vw',
    color: ICE_BLUE,
  },
  factLine: {
    textIndent: 20,
    margin: 0,
    textAlign: 'left'
  },
  noImages: {
    color: FONT_GREY,
    fontSize: "80px",
    paddingTop: "20%",
    paddingBottom: "25%",
    textAlign: "center",
    backgroundColor: "rgba(40, 40, 40, .6)",
    marginTop: "5%",
    visibility: 'visible'
  },
  modal: {
    width: "90%", 
    margin: "5%", 
    overflow: "scroll",
    '&::-webkit-scrollbar': {
      display: 'none',
    }
  }
})

const theme = {
  navBarBackgroundColor: OFF_BLACK_1,
  logoColor: ICE_BLUE,
  menuBackgroundColor: OFF_BLACK_2,
  cardBackgroundColor: ICE_BLUE,
  iconFillColor: OFF_BLACK_1
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      destinations: [],
      places: {},
      albums: {},
      photos: {},
      ready: false,

      //General
      selectedCity: null,
      selectedPlace: null,
      hoverIndexCity: null,
      hoverIndexPlace: null,

      //view
      viewUser: "",
      viewCities: [],
      viewPlaces: [],

      //Map
      granularity: 1,
      mapZoom: 4,
      mapCenter: {
        lat: DEFAULT_CENTER.lat,
        lng: DEFAULT_CENTER.lng,
      },
      closestCity: null,

      //Gallery
      galleryOpen: false,
      preparedImages: [],

      //ImageViewer
      imageViewerOpen: false,
      currImg: null,
    }
  }

  componentDidMount() {
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

  changeHoverIndexCity = (index) => {
    this.setState({
      hoverIndexCity: index,
    })
  }

  changeHoverIndexPlace = (index) => {
    this.setState({
      hoverIndexPlace: index
    })
  }

  setClosestCity = (destinations, centerLat, centerLong) => {
    var lowest = 99999999, lowestIndex = null, distance

    if (destinations.length > 0)
      destinations.forEach((obj, i) => {
        distance = getDistanceBetweenTwoPoints(centerLat, centerLong, obj.latitude, obj.longitude);
        if (distance < lowest) {
          lowest = distance;
          lowestIndex = i
        }
      })

    const closestCity = { ...destinations[lowestIndex], distanceFromMapCenter: lowest }

    this.setState({
      closestCity: closestCity
    })

    return closestCity
  }

  //Map Functions
  changeGranularity = (zoom) => {
    this.setState({
      granularity: zoom > GRANULARITY_CUTOFF ? 0 : 1,
      mapZoom: zoom,
    })
  }

  changeMapCenter = (obj) => {
    this.setState({
      mapCenter: {
        lat: obj.latitude,
        lng: obj.longitude
      }
    })
  }

  onMarkerClick = (obj) => {
    const photos = this.state.photos;
    if (this.state.granularity === 1) {
      this.changeMapCenter(obj)
      this.changeGranularity(GRANULARITY_CUTOFF + 1)
      this.changeHoverIndexCity(null)
      this.setState({
        selectedCity: obj,
      })
    } else if (this.state.granularity === 0) {
      this.setState({
        selectedPlace: obj,
        preparedImages: obj.destination_id in photos && obj.place_id in photos[obj.destination_id] ? photos[obj.destination_id][obj.place_id] : [],
        galleryOpen: true,
      })
    }
  }

  //Table Functions
  tableRowClick = (obj, e) => {
    const data = obj.rowData;
    const photos = this.state.photos;
    if (this.state.granularity === 1) {
      this.setState({
        selectedCity: obj.rowData,
        //The kill attribute make sure that an icon within the row isn't being clicked
        mapZoom: obj.event.target.getAttribute("value") !== "KILL" ? 12 : this.state.mapZoom,
        granularity: 1,
        hoverIndexCity: null
      })
    } else if (this.state.granularity === 0) {

      this.setState({
        selectedPlace: data,
        preparedImages: data.destination_id in photos && data.place_id in photos[data.destination_id] ? photos[data.destination_id][data.place_id] : [],
        //The kill attribute make sure that an icon within the row isn't being clicked
        galleryOpen: obj.event.target.getAttribute("value") !== "KILL" ? true : false,
      })
    }
  }

  cityGallery = (obj) => {
    var images = []
    Object.values(this.state.photos[obj.destination_id] ? this.state.photos[obj.destination_id] : []).forEach(x =>{
      images = images.concat(x);
    })
    this.setState({
      preparedImages: images,
      galleryOpen: true
    })
  }


  //Gallery Functions
  toggleGallery = (value) => {
    console.log(this.state.galleryOpen)
    const boolean = typeof (value) === 'boolean' ? value : !this.state.galleryOpen;
    this.setState({
      galleryOpen: boolean
    })
  }

  galleryOnClick = (event, obj) => {
    this.setState({
      galleryOpen: false,
      currImg: obj.index,
      imageViewerOpen: true
    })
  }

  //Image Viewer Functions
  toggleViewer = (value) => {
    const boolean = typeof (value) === 'boolean' ? value : !this.state.imageViewerOpen;
    this.setState({
      imageViewerOpen: boolean,
      galleryOpen: boolean ? false : true,
    })
  }

  render() {
    const classes = this.props.classes;
    var destinations = this.state.destinations;
    var places = this.state.places;
    var albums = this.state.albums;

    if (this.state.ready) {
      return (
        <div className={clsx(classes.page)}>
          <Navigation theme={theme}/>
          <div>
            <div className={clsx(classes.infoDiv)}>
              <p className={clsx(classes.title)}>My Travel Map</p>
              <div className={clsx(classes.factDiv)}>
                <p className={clsx(classes.factLine)} style={{ textIndent: 0 }}>{"I've Visited: "}</p>
                <p className={clsx(classes.factLine)}>{`${[...new Set(this.state.destinations.map(el => el.country_code))].length} Countries`}</p>
                <p className={clsx(classes.factLine)}>{`${this.state.destinations.filter(el => el.type === 1).length} Cities`}</p>
                <p className={clsx(classes.factLine)}>{`${this.state.destinations.filter(el => el.type === 2).length} National Parks`}</p>
              </div>
            </div>

            <div className={clsx(classes.main)}>
              <Map
                center={this.state.mapCenter}
                zoom={this.state.mapZoom}
                destinations={destinations}
                places={places}
                hoverIndex={this.state.granularity ? this.state.hoverIndexCity : this.state.hoverIndexPlace}
                changeHoverIndex={this.state.granularity ? this.changeHoverIndexCity : this.changeHoverIndexPlace}
                closestCity={this.state.closestCity}
                setClosestCity={this.setClosestCity}
                markerClick={this.onMarkerClick}
                granularity={this.state.granularity}
                changeMapCenter={this.changeMapCenter}
                changeGranularity={this.changeGranularity}
              />

              <Table
                cities={destinations}
                places={places}
                albums={albums}
                hoverIndex={this.state.granularity ? this.state.hoverIndexCity : this.state.hoverIndexPlace}
                changeHoverIndex={this.state.granularity ? this.changeHoverIndexCity : this.changeHoverIndexPlace}
                tableRowClick={this.tableRowClick}
                granularity={this.state.granularity}
                selectedCity={this.state.selectedCity}
                closestCity={this.state.closestCity}
                mapCenter={this.state.mapCenter}
                changeMapCenter={this.changeMapCenter}
                onCityGalleryClick={this.cityGallery}
                place_colors={place_colors}
                city_colors={city_colors}
              />
            </div>

            <Modal
              open={this.state.galleryOpen}
              onClose={this.toggleGallery}
              className={classes.modal}
            >
                {this.state.preparedImages.length > 0 ?
                <Gallery photos={this.state.preparedImages} onClick={this.galleryOnClick} /> :
                <div className={clsx(classes.noImages)}>No Images...</div>
              }
            </Modal>

            {this.state.imageViewerOpen ?
              <ImageViewer
              isOpen={this.state.imageViewerOpen}
              toggleViewer={this.toggleViewer}
              toggleGallery={this.toggleGallery}
              views={this.state.preparedImages}
              currentIndex={this.state.currImg}
              /> : null
            }
          </div>
        </div>
      )
    } else {
      return (
        <div style={{
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: "#000000",
        }}>
          <RingLoader
            color={ICE_BLUE}
            loading={true}
            css={`position: absolute; left: 0; right: 0; margin: auto; background-color: #000000; top: ${(window.innerHeight - 500) / 2.5}px`}
            size={300}
          />
          <p style={{
            position: 'absolute',
            left: 0,
            right: 0,
            color: ICE_BLUE,
            textAlign: 'center',
            fontSize: 50,
            bottom: window.innerHeight * .1,
          }}>Loading</p>
        </div>
      )
    }
  }
}

Main.propTypes = {
  destinations: PropTypes.array,
  places: PropTypes.array,
  ready: PropTypes.bool
}

export default withStyles(styles)(Main);