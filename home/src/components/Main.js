import React from 'react';
import Gallery from "react-photo-gallery";
import { withStyles } from '@material-ui/styles';
import Navigation from './Navigation';
import Popup from './Popup';

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
    marginTop: '5vh',
    height: '95vh',
    overflow: "scroll",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
})

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    console.log(this.props)
    const classes = this.props.classes;
    return (
      <div>
        <Navigation />
        <div className={classes.gallery}>
          <Gallery photos={this.props.images}/>
        </div>
        <Popup />

      </div>
    )
  }
}

export default withStyles(styles)(Main);