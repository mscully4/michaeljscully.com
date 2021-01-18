import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import Marker from './Marker.js';

const styles = {
  map: {
    width: '100%',
    height: '75vh',
    margin: 'auto'
  }
}

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: {}
    }
  }

  onChange = ({ center, zoom, bounds }) => {
    this.props.changeGranularity(zoom)
    this.props.changeMapCenter({ latitude: center.lat, longitude: center.lng })
    this.props.setClosestCity(this.props.cities, center.lat, center.lng)
    this.setState({
      bounds: bounds
    })
  }

  createMapOptions = (maps) => {
    return {
      //this controls where and how the zoom control is rendered
      zoomControlOptions: {
        position: maps.ControlPosition.RIGHT_CENTER,
        style: maps.ZoomControlStyle.SMALL
      },
      //this allows the user to change the type of map that is shown
      mapTypeControl: false,
      //this controls where and how different map options are rendered
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT
      },
      gestureHandling: "cooperative",
      keyboardShortcuts: false,
    };
  }

  withinBounds = (obj) => {
    // var latitude = this.props.granularity ? obj.latitude : obj.latitude, longitude = this.props.granularity ? obj.longitude : obj.longitude
    if (this.state.bounds.nw) {
      return obj.latitude <= this.state.bounds.nw.lat
        && obj.latitude >= this.state.bounds.sw.lat 
        && obj.longitude >= this.state.bounds.nw.lng
        && obj.longitude <= this.state.bounds.ne.lng
    }
  }

  createMarkers = (granularity) => {
    if (granularity && this.props.cities) {
      return this.props.cities
      .filter(el => this.withinBounds(el))
      .map(data =>
        <Marker
          key={data.city + data.index}
          lat={data.latitude}
          lng={data.longitude}
          data={data}
          changeHoverIndex={this.props.changeHoverIndex}
          hoverIndex={this.props.hoverIndex}
          markerClick={this.props.markerClick}
          zoom={this.props.zoom}
          granularity={this.props.granularity}
        />
      )
    } else if (!granularity && this.props.places) {
      return this.props.places
      .filter(el => this.withinBounds(el))
      .map(data =>
        <Marker
          key={data.name + data.index}
          lat={data.latitude}
          lng={data.longitude}
          data={data}
          changeHoverIndex={this.props.changeHoverIndex}
          hoverIndex={this.props.hoverIndex}
          markerClick={this.props.markerClick}
          zoom={this.props.zoom}
          granularity={this.props.granularity}
        />
      )
    }
  }

  render() {
    return (
      <div style={styles.map}>
        <GoogleMapReact
          center={this.props.center}
          zoom={this.props.zoom}
          keyboardShortcuts={false}
          options={this.createMapOptions}
          onChange={this.onChange}
          bootstrapURLKeys={{ key: 'AIzaSyAk_bN5yfkLuUzptVXIHWs59YdFmI_TjAc' }}
        >
          {this.createMarkers(this.props.granularity)}
        </GoogleMapReact>
      </div>
    )
  }
}

Map.propTypes = {
  center: PropTypes.object,
  zoom: PropTypes.number,
  places: PropTypes.array,
  cities: PropTypes.array,
  hoverIndex: PropTypes.number,
  changeHoverIndex: PropTypes.func,
  setClosestCity: PropTypes.func,
  granularity: PropTypes.number,
  hoverIndex: PropTypes.number,
  markerClick: PropTypes.func,
}

export default Map;