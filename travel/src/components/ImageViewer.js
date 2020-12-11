import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from 'reactstrap';
import { withStyles } from '@material-ui/styles';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// import { ImgEditor} from '../components/ImageEditor';
import { close, editorPath, trash, Svg } from '../utils/SVGs'
import { ICE_BLUE, FONT_GREY } from '../utils/Colors'

class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    var currentIndex = this.props.currentIndex >= this.props.views.length ? 0 : this.props.currentIndex
    return (

      <Modal
        isOpen={true}
        toggle={this.props.toggleViewer}
        size={"xl"}
        style={{ backgroundColor: "transparent" }}
      >
        <Carousel 
        showArrows={true} 
        showThumbs={false} 
        selectedItem={currentIndex} 
        dynamicHeight={true}
        renderItem={(item, options) => item}
        >
          {this.props.views.map((photo, index) => {
            return (
              <div>
                <img key={index} src={photo.src} />
              </div>
            )
          })}
        </Carousel>
      </Modal>

    )
  }
}

ImageViewer.propTypes = {
  views: PropTypes.array,
  currentIndex: PropTypes.number,
  toggleViewer: PropTypes.func,
  handleDeleteImage: PropTypes.func,
  toggleViewer: PropTypes.func,
  toggleGallery: PropTypes.func,
  owner: PropTypes.bool,
  isOpen: PropTypes.bool,
  requestPending: PropTypes.bool
}

export default ImageViewer;