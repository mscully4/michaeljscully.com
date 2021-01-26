import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
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
  searchBar: {
    width: '80%',
    margin: 'auto'
  },
  searchBarInput: {
    color: ICE_BLUE
  },
  searchBarLabel: {
    color: `${ICE_BLUE} !important`
  },
  searchBarBorder: {
    borderWidth: '1px',
    borderColor: `${ICE_BLUE} !important`
  },
  searchBarOptions: {
    color: ICE_BLUE,
    width: '100%',
    height: '100%',
    '&[data-focus="true"]': {
      backgroundColor: `${ICE_BLUE} !important`,
      '& div': {
        color: `${OFF_BLACK_1} !important`,
      }
    },
  },
  listbox: {
    backgroundColor: OFF_BLACK_1,
    border: `solid 1px ${ICE_BLUE}`,
    borderRadius: 5
  },
  userInfo: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '3fr auto 30px auto',
    alignItems: 'center',
  },
  username: {
    // fontFamily: "Kaushan Script",
    fontSize: 20,
    margin: "auto",
    lineHeight: 'inherit',
    color: FONT_GREY,
    fontWeight: 'unset',
  },
  divider: {
    fontSize: '150%',
    margin: 'auto',
    color: FONT_GREY
  },
  logout: {
    color: ICE_BLUE,
    fontSize: 20,
    textAlign: 'left',
    paddingRight: 50
  },
  homeIcon: {
    width: 32,
    height: 32,
    cursor: 'pointer',
    marginRight: 20,
    float: 'right',
  },
  actionButtons: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr 1fr'
  },
  button: {
    backgroundColor: ICE_BLUE,
    width: '60%',
    display: 'block',
    margin: 'auto'
  }
})

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      showSignUpModal: false,

      searchValue: "",
      searchSuggestionsOpen: false,
      suggestions: []
    }
  }

  render() {
    const classes = this.props.classes

    const signUpButton = this.props.context === "Main" ?
      <Button className={clsx(classes.button)} style={{ marginRight: 15 }} onClick={this.toggleSignUp}>Sign Up</Button>
      : <div></div>;

    return (
      <div className={clsx(classes.navigationBar)} >
        <p className={clsx(classes.logo)}>My Travel Map</p>
        {/* If the user is signed in and his/her data is loaded, then show the username with the logout button */}
        {/* Otherwise show the login/signup buttons.  The signup button is shown on Main but not Home */}
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