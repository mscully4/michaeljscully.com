import React from 'react';

import logo from './logo.svg';
import './App.css';

import Main from './components/Main';

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }
}

export default App;
