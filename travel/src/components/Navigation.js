import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx'

import { ICE_BLUE, FONT_GREY, OFF_BLACK_1, OFF_BLACK_2, OFF_BLACK_3, OFF_BLACK_4 } from '../utils/Colors'

const styles = theme => ({
  navigationBar: {
    backgroundColor: OFF_BLACK_2,
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center'
  },
  logo: {
    fontFamily: "Allura",
    fontSize: '3vw',
    color: ICE_BLUE,
    paddingLeft: '2vw ',
    textAlign: 'left',
    marginBottom: 0
  },
})

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const classes = this.props.classes

    return (
      <div className={clsx(classes.navigationBar)} >
        <p className={clsx(classes.logo)}>Michael Scully</p>
      </div>
    )
  }
}

Navigation.propTypes = {
  handleLogin: PropTypes.func,
  handleSignUp: PropTypes.func,
  handleLogout: PropTypes.func,
  loadingUserData: PropTypes.bool,
  error: PropTypes.object,
  setError: PropTypes.func,
  context: PropTypes.string,
  loggedIn: PropTypes.bool,
  loggedInUser: PropTypes.string,
  loggedInUserData: PropTypes.object,
  history: PropTypes.object,
  viewUser: PropTypes.object,
  pendingLoginRequest: PropTypes.bool,
  pendingSignUpRequest: PropTypes.bool,
}

export default withStyles(styles)(Navigation);