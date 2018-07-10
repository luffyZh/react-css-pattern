import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InlineStyleModule from './components/inline-style-module/inlineStyleModule';
import JSS from './components/css-in-js/JSS';
import RadiumButton from './components/css-in-js/Radium';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-content">
          <InlineStyleModule />
          <JSS />
          <RadiumButton>radium</RadiumButton>
        </div>
      </div>
    );
  }
}

export default App;
