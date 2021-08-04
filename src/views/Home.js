import React from 'react';
import Gallery from "react-photo-gallery";
import { withStyles } from '@material-ui/styles';
import Navigation from '../components/Navigation';
import Popup from '../components/Popup';
import {HOME_API_URL} from '../utils/Constants';

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



const styles = theme => ({
  stuff: {
    width: 500,
    height: 250,
    backgroundColor: "#fff",
    left: "50%",
    top: '50%',
    position: "fixed",
    transform: "translate(-50%, -50%)",
    boxShadow: `0 0 4px #000 !important`,
    opacity: '0.75'
  },
  gallery: {
    // marginTop: '5vh',
    height: '95vh',
    overflow: "scroll",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
})

const theme = {
  navBarBackgroundColor: "#ffffff",
  logoColor: "#000000",
  menuBackgroundColor: "#ffffff",
  cardBackgroundColor: "#ffffff",
  iconFillColor: "#000000"
}

const navStyles = theme => ({
  navigationBar: {
    backgroundColor: "#fff",
    boxShadow: '0 0 4px #000 !important',
    position: "fixed",
    width: "100%",
    top: 0,
  },
  logo: {
    fontFamily: "Allura",
    fontSize: '2.5vw',
    color: "#000",
    paddingLeft: '2vw ',
    textAlign: 'left',
    marginBottom: 0,
    marginTop: 0
  },
  menu: {
    position: 'fixed',
    top: '10vh',
    left: 0,
    height: '80vh',
    width: '5vw',
    boxShadow: `0 0 4px #000 !important`,
    borderRadius: 6,
    backgroundColor: "#fff"
  },
  card: {
    boxShadow: '0 0 4px #000 !important',
    borderRadius: 6,
    backgroundColor: "#fff",
    cursor: 'pointer',
    width: '80%',
    paddingTop: '80%',
    position: 'relative',
    margin: '10% 10%',
    "&:hover": {
      transform: 'scale(1.05)',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
    }
  },
  icon: {
    maxWidth: '90%',
    maxHeight: '90%',
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    margin: 'auto',
    left: 0,
    right: 0,
    fill: "#000",
  }
})

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
  }

  componentDidMount = () => {
    fetch(HOME_API_URL)
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
    const classes = this.props.classes;
    return (
      <div>
        <Navigation theme={theme}/>
        <div className={classes.gallery}>
          <Gallery photos={this.state.images}/>
        </div>
        <Popup />
      </div>
    )
  }
}

export default withStyles(styles)(Home);