import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Header, Movie, Detail } from 'components'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/movie/:id" component={Movie} />
        <Route path="/detail/:id" component={Detail} />
      </div>
    );
  }
}

export default App;
