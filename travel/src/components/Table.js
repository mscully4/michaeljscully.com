import React, { Component } from 'react';
import { Column, Table } from 'react-virtualized';
import { PropTypes } from 'prop-types'
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactCountryFlag from "react-country-flag"

import 'react-virtualized/styles.css';
// import "flag-icon-css/css/flag-icon.min.css";

import { getDistanceBetweenTwoPoints } from '../utils/Formulas.js';
import { place_colors, FONT_GREY, OFF_BLACK_2, OFF_BLACK_3, OFF_BLACK_4, ICE_BLUE } from "../utils/Colors"
import { gallery, Svg } from "../utils/SVGs"

//Places within these distances of the center of the map will be included in the table
const DISTANCE_FROM_CITY = 200 /*miles*/
const DISTANCE_FROM_PLACE = 200

const styles = theme => ({
  container: {
    backgroundColor: OFF_BLACK_2,
    width: '100%'
  },
  table: {
    width: '100%'
  },
  tableRow: {
    cursor: 'pointer',
    '&:focus': {
      outline: "none"
    },
  },
  row_a: {
    backgroundColor: OFF_BLACK_3
  },
  row_b: {
    backgroundColor: OFF_BLACK_4

  },
  tableRowHover: {
    backgroundColor: ICE_BLUE,
  },
  cell: {
    display: "grid", 
    gridTemplateRows: '100%', 
    gridTemplateColumns: '1fr 2fr',
    height: '100%',
    alignItems: 'center' 
  },
  cellText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: FONT_GREY,
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  },
  addSVG: {
    position: 'absolute',
    top: 10,
    right: 25,
    height: 25,
    width: 25,
  },
  photoGallerySVG: {
    position: 'absolute',
    height: 25,
    width: 30,
    top: 10,
    right: 25,

  },
  coverImage: {
    maxWidth: '80%',
    maxHeight:' 80%',
    margin: 'auto'
  },
  columnHeader: {
    textAlign: "center",
    color: FONT_GREY
  },
  column: {
    width: '100%',
    height: '100%'
  }
})

class VirtualTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollTop: 0,
      allowMouseOver: true,
    }
  }

  handleScroll = ({ target: { scrollTop } }) => {
    this.setState({ scrollTop });
  };

  getRowClassName = (index, obj) => {
    const classes = this.props.classes;
    return clsx({ [classes.tableRow]: index !== -1 },
      { [classes.tableRowHover]: (obj ? obj.index : -1) === this.props.hoverIndex },
      { [classes.row_b]: index % 2 === 0 },
      { [classes.row_a]: index % 2 === 1 },
    )
  }

  cellRendererPlace = (cellData) => {
    const classes = this.props.classes;
    const data = cellData.cellData;
    const albums = this.props.albums;
    const album = data.destination_id in albums && data.place_id in albums[data.destination_id] ? albums[data.destination_id][data.place_id] : {};

    const src = album && album.cover_photo_src ? album.cover_photo_src : null
    return (
      <div className={(clsx(classes.cell))}>
        <img className={clsx(classes.coverImage)} src={src}/>
        <div>
          <div className={clsx(classes.cellText)}>{data.name.trim()}</div>
          <div className={clsx(classes.cellText)}>{data.city.trim()}{data.country.trim() ? `, ${data.country.trim()}` : ""}</div>
        </div>

      </div>
    )
  }

  cellRendererCity = (cellData) => {
    const classes = this.props.classes;
    var greyOutGalleryIcon = false;

    // cellData.rowData.places.forEach(element => {
    //   if (element.images.length > 0) greyOutGalleryIcon = false
    // });

    return (
      <div className={clsx(classes.cell)}>
        <ReactCountryFlag
          countryCode={cellData.rowData.country_code}
          svg
          style={{
            height: '30%',
            width: 'auto',
            margin: 'auto'
          }}
          title={cellData.rowDate}
        />

        <p className={clsx(classes.cellText)}>
          {cellData.rowData.name}, <br />   {cellData.rowData.country}
        </p>


        <Svg
          className={clsx(this.props.classes.photoGallerySVG)}
          onClick={(e) => { if (!greyOutGalleryIcon) this.props.onCityGalleryClick(cellData.cellData, e) }}
          value={"KILL"}
          viewBox={gallery.viewBox}
        >
          {gallery.path.map((el, i) => <path key={`${i}`} d={el} fill={`rgba(248, 248, 248, ${greyOutGalleryIcon ? ".2" : "1"})`} />)}
        </Svg>

      </div>
    )
  }

  getPlaces = () => {
    if (this.props.closestCity.distanceFromMapCenter <= DISTANCE_FROM_CITY) {
      return this.props.places[this.props.closestCity.destination_id] ? this.props.places[this.props.closestCity.destination_id] : [];
    } else {
      return []
      // return this.props.places.filter((el) => getDistanceBetweenTwoPoints(this.props.mapCenter.lat, this.props.mapCenter.lng, el.latitude, el.longitude) < DISTANCE_FROM_PLACE)
    }
  }

  renderThumb({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: FONT_GREY
    };
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props} />
    );
  }

  renderView = ({ style, ...props }) => {
    //this hides the default scrollbar
    style.marginRight = -50;
    style.marginBottom = -16;
    return <div style={style} {...props} />
  }


  render = () => {
    const WIDTH = window.innerWidth * .36;
    const HEIGHT = window.innerHeight;
    const list = this.props.granularity ? this.props.cities : this.getPlaces();

    const HEADER_HEIGHT = 40;

    const classes = this.props.classes
    return (
      <div className={classes.container}>

        <Scrollbars
          className={clsx(classes.scrollBar)}
          onScroll={this.handleScroll}
          renderThumbVertical={obj => this.renderThumb(obj)}
          renderView={this.renderView}
        >
          <Table
            autoHeight
            scrollTop={this.state.scrollTop}
            width={WIDTH}
            className={classes.table}
            height={HEIGHT}
            headerHeight={HEADER_HEIGHT}
            headerStyle={{ margin: 'auto'}}
            rowHeight={HEIGHT / 5}
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}
            rowClassName={({ index }) => this.getRowClassName(index, list[index])}
            rowStyle={{'width': '100%'}}
            onRowMouseOver={(obj) => {
              if (this.state.allowMouseOver) {
                this.props.changeHoverIndex(obj.rowData.index);
                this.props.changeMapCenter(obj.rowData);
              }
            }}
            onRowMouseOut={() => this.props.changeHoverIndex(null)}
            onRowClick={(obj, e) => {
              //Temporarily disable the mouse over functionality to avoid a mouse over action right after a click event
              this.setState({
                allowMouseOver: false,
              })
              this.props.changeMapCenter(obj.rowData);
              this.props.tableRowClick(obj, e)
              setTimeout(() => {
                this.setState({
                  allowMouseOver: true
                })
              }, 250)
            }}
          >
            <Column
              label="Destination"
              dataKey="destination"
              width={'100%'}
              headerStyle={{
                color: FONT_GREY,
              }}
              className={classes.column}
              headerRenderer={() => {
                return (
                  <div className={classes.columnHeader}>
                    {this.props.granularity ? "Destinations" : "Places"}
                  </div>
                )
              }}
              cellRenderer={this.props.granularity ? this.cellRendererCity : this.cellRendererPlace}
              cellDataGetter={({ dataKey, rowData }) => rowData}
            />
          </Table>
        </Scrollbars>
      </div>

    )
  }
}

VirtualTable.propTypes = {
  cities: PropTypes.array,
  places: PropTypes.array,
  hoverIndex: PropTypes.number,
  changeHoverIndex: PropTypes.func,
  tableRowClick: PropTypes.func,
  granularity: PropTypes.number,
  selectedCity: PropTypes.object,
  closestCity: PropTypes.object,
  mapCenter: PropTypes.object,
  changeMapCenter: PropTypes.func,
  onCityGalleryClick: PropTypes.func,
  place_colors: PropTypes.object,
  city_colors: PropTypes.array
}

export default withStyles(styles)(VirtualTable);