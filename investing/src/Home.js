import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import TreeMap from './TreeMap.js'
import Returns from './Returns.js'
import Navigation from './Navigation.js';
import { Switch, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// import Grid from '@material-ui/core/Grid';

import { MEASURE_DOLLARS, MEASURE_PERCENT, BASE_URL } from './constants.js'

const measureEnum = {
  MEASURE_DOLLARS: true,
  MEASURE_PERCENT: false
}

const styles = {
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
  checked: {}
};

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      // measure: MEASURE_PERCENT,
      measure: MEASURE_DOLLARS
    }
  }

  switchOnChange = (e, value) => {
    this.setState({
      measure: value ? MEASURE_PERCENT : MEASURE_DOLLARS
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
    return this.props.positions ? (<TreeMap holdings={this.props.positions} measure={measure} />) : null;
  }

  renderReturnGraph = (measure) => {
    return this.props.returns ? (<Returns data={this.props.returns} measure={measure} />) : null;
  }

  render = () => {
    const classes = this.props.classes;
    const measure = this.state.measure;

    return (
      <div>
        <Navigation />
        {this.renderSwitch(measure)}
        {this.renderTreeMap(measure)}
        {this.renderReturnGraph(measure)}

      </div>
    )
  }
}

export default withStyles(styles)(Home);