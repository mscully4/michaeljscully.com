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
  gallery: {
    // marginTop: '5vh',
    height: '92.5vh',
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