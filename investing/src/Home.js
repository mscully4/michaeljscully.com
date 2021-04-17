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


import { MEASURE_DOLLARS, MEASURE_PERCENT, BASE_URL } from './constants.js'

const measureEnum = [MEASURE_DOLLARS, MEASURE_PERCENT]

const styles = {
  title: {
    fontSize: '6vw',
    textAlign: 'center',
    fontFamily: 'aguafina-script',
    marginTop: '5vh',
    marginBottom: 0
  },
  //Grid
  gridContainer: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
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
    gridColumn: "4 / 7"
  },
  //Returns Graph
  lineGraphContainer: {
    width: "90%",
    height: "90%",
    gridRow: "2",
    gridColumn: '1/4'
  },
  //Data Table
  dataTable: {
    width: "90%",
    margin: 'auto',
    marginTop: 0,
    gridRow: "1",
    gridColumn: '3'
  },
  //Description
  description: {
    textIndent: 10,
    width: "90%",
    margin: '0 auto',
    gridRow: "1",
    gridColumn: "1 / 3"
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

  renderDescription = () => {
    return (
    <p className={clsx(this.props.classes.description)}>
      This is my algorithmic trading portfolio!  I've hand picked around 50 tech(ish) stocks that I believe will build the future!  I created a Lambda Function to run every trading day, rebalancing my portfolio according to my weighting algorithm, which is the cube root of each company's market cap. By using the cube root, I decreased the weight of larger companies and increased the weight of smaller ones.  When the function runs every day, it calculates what my portfolio should look like and compares that with what it actually looks like.  Ideally, it would buy and sell to meet this desired allocation, but by selling, I would be realizing capital gains and therefore would have to pay taxes.  So I changed my algorithm to never sell and to buy in such a way as to get as close to the desired allocation as possible.  I have also added functionality to transfer money into my account at random intervals, to take advantage of dollar cost averaging.  To the bottom and to the right, you can see how I am doing, and all the way to the right you can see what companies I own!
    </p>)
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
          {this.renderDescription()}
          {this.renderDataTable(classes.dataTable)}
          {this.renderReturnsGraph(measure, classes.lineGraphContainer)}
          {this.renderTreeMap(measure)}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home);