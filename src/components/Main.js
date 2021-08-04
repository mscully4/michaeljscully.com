import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from '../views/Home';
import Travel from '../views/Travel'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/travel" component={Travel}/>
        {/* <Route path="/" component={Home}/> */}

      </Switch>
    )
  }
}

export default Main;