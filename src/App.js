import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Header, Movie, Loading, Detail } from 'components'

import './App.css';
import matchPath from 'react-router-dom/matchPath';

class App extends Component {
  state = {}
  componentDidMount() {
    this._getMovies('now_playing');
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
  _callApiDetail = (num) => {
    return fetch(`https://api.themoviedb.org/3/movie/${num}?api_key=dfebf9cfca6fde7ded33adb1b64575ab`)
    .then(res => res.json())
    .catch(err => console.log(err))
  }
  _getDetail = async (num) => {
    const movie = await this._callApiDetail(num);
    this.setState({
      movie
    })
  }
  render() {
    const { movies, movie } = this.state;
    return (
      <div className="App">
        <Header />
        {this.state.movies
          ?<Route exact path="/" component={() => <Home movies={movies} />} />
          :<Loading />
        } 
        <Route path="/movie" component={Movie} />
        {this.state.movie
          ?<Route path="/detail/:id" render={(props) => <Detail {...props} _getDetail={this._getDetail} movie={movie} />} />
          :<Route path="/detail/:id" render={(props) => <Loading {...props} _getDetail={this._getDetail} />} />
        }
      </div>
    );
  }
}

export default App;
