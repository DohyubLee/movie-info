import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Header, Movie, Loading } from 'components'

import './App.css';

class App extends Component {
  state = {}
  componentDidMount() {
    this._getMovies();
  }
  _callApi = () => {
    const name = 'now_playing';
    return fetch(`https://api.themoviedb.org/3/movie/${name}?api_key=dfebf9cfca6fde7ded33adb1b64575ab`)
    .then(res => res.json())
    .then(json => json.results)
    .catch(err => console.log(err))
  }
  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }
  render() {
    const { movies } = this.state;
    return (
      <div className="App">
        <Header />
        {this.state.movies
          ?<Route exact path="/" component={() => <Home movies={movies} />} />
          :<Route exact path="/" component={Loading}
        />}
        <Route path="/movie" component={Movie} />
      </div>
    );
  }
}

export default App;
