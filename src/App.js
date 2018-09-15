import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Header, Movie, Detail } from 'components'
import './App.css';

class App extends Component {
  render() {
    const defaultPath = "/movie-info"
    return (
      <div className="App">
        <Header />
        <Route exact path={defaultPath + "/"} component={Home} />
        <Route path={defaultPath + "/movie/:id"} component={Movie} />
        <Route path={defaultPath + "/detail/:id"} component={Detail} />
      </div>
    );
  }
}

export default App;
