import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import TreeMap from './TreeMap.js'
import Returns from './Returns.js'
import Navigation from './Navigation.js';
import DataTable from './Table.js';

import { Switch, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// import Grid from '@material-ui/core/Grid';

import { MEASURE_DOLLARS, MEASURE_PERCENT, BASE_URL } from './constants.js'

const measureEnum = [MEASURE_DOLLARS, MEASURE_PERCENT]

const styles = {
  title: {
    fontSize: 50,
    textAlign: 'center'
  },
  //Grid
  gridContainer: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    height: 750,
    width: "90%",
    marginLeft: '7.5%',
    marginBottom: 200
  },
  //Switch
  switchContainer: {
    padding: 10,
    marginLeft: '7.5%'
  },
  switchBase: {
    color: '#000',
    '&$checked': {
      color: '#000',
      '& + $track': {
        backgroundColor: '#999',
        opacity: 1,
      },
    },
  },
  track: {
    backgroundColor: "#999",
    opacity: 1,
  },
  checked: {},
  //TreeMap
  treeMapContainer: {
    width: "100%",
    height: "100%",
    gridRow: "1 / 3",
    gridColumn: "3 / 5"
  },
  //Returns Graph
  lineGraphContainer: {
    width: "90%",
    height: "90%",
    gridRow: "2",
    gridColumn: '1/3'
  },
  //Data Table
  dataTable: {
    width: "90%",
    margin: 'auto',
    gridRow: "1",
    gridColumn: '2'
  },
  //Description
  description: {
    width: "90%",
    margin: '0 auto',
    gridRow: "1",
    gridColumn: "1"
  }
};

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      //0 is dollars, 1 is percent
      measure: 0
    }
  }

  switchOnChange = (e, value) => {
    this.setState(prevState => {
      return {
        measure: Math.abs(prevState.measure - 1)
      }
    })
  }

  renderSwitch = (measure) => {
    const classes = this.props.classes;
    return (
      <Grid component="label" container alignItems="center" spacing={1} className={clsx(classes.switchContainer)}>
        <Grid item>Dollars</Grid>
        <Grid item>
          <Switch
            checked={measureEnum[measure]}
            onChange={this.switchOnChange}
            name="measure"
            classes={{
              switchBase: classes.switchBase,
              track: classes.track,
              checked: classes.checked
            }}
          />
        </Grid>
        <Grid item>Percent</Grid>
      </Grid>
    )
  }

  renderTreeMap = (measure) => {
    const classes = this.props.classes;
    return (
      <div className={clsx(classes.treeMapContainer)}>
        {/* <span>Positions</span> */}
        {this.props.positions ? (<TreeMap holdings={this.props.positions} measure={measure} />) : null}
      </div>
    )
  }

  renderReturnsGraph = (measure, className) => {
    return (
      <div className={clsx(className)}>
        {this.props.returns ? (<Returns data={this.props.returns} measure={measure} />) : null}
      </div>)
  }

  renderDataTable = (className) => {
    return (
      <div className={clsx(className)}>
        {this.props.transfers && this.props.account ? (<DataTable account={this.props.account} transfers={this.props.transfers} />) : null}
      </div>
    )
  }

  render = () => {
    const classes = this.props.classes;
    const measure = measureEnum[this.state.measure];

    return (
      <div className={classes.home}>
        <Navigation />
        <p className={classes.title}>Investing</p>
        {this.renderSwitch(measure)}

        <div className={classes.gridContainer}>
          <p className={clsx(classes.description)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed enim nulla. Sed eget viverra urna. Maecenas convallis turpis sed odio varius laoreet. Phasellus libero tellus, venenatis et convallis eu, venenatis sed leo. Praesent et euismod mauris, at tempus turpis. Sed tincidunt felis quis eros.</p>
          {this.renderDataTable(classes.dataTable)}
          {this.renderReturnsGraph(measure, classes.lineGraphContainer)}
          {this.renderTreeMap(measure)}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home);