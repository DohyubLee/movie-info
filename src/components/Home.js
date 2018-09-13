import React, { Component } from 'react';
import 'css/Home.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Loading from './Loading'

class Home extends Component {
    state = {}
    _callApi = () => {
        const name = 'now_playing';
        return fetch(`https://api.themoviedb.org/3/movie/${name}?api_key=dfebf9cfca6fde7ded33adb1b64575ab`)
        .then(res => res.json())
        .then(json => json.results)
        .catch(err => console.log(err))
    }
    _callApiKo = () => {
        const name = 'now_playing';
        return fetch(`https://api.themoviedb.org/3/movie/${name}?api_key=dfebf9cfca6fde7ded33adb1b64575ab&language=ko`)
        .then(res => res.json())
        .then(json => json.results)
        .catch(err => console.log(err))
    }
    _getMovies = async () => {
        const movies = await this._callApi();
        const moviesKo = await this._callApiKo();
        console.log(movies)
        console.log(moviesKo)
        this.setState({
          movies,
          moviesKo
        })
    }
    componentDidMount() {
        this._getMovies();
    }
    _renderMovies = () => {
        const moviesList = this.state.movies.map(({poster_path, id}) => {
            return <MovieItem poster={poster_path} id={id} key={id} />
        })
        return moviesList;
    }
    _renderMoviesKo = () => {
        const moviesListKo = this.state.moviesKo.map(({id, backdrop_path, title, release_date}) => {
            return <MovieItemKo poster={backdrop_path} id={id} key={id} title={title} date={release_date} />
        })
        return moviesListKo;
    }
    render() {
        const settings = {
            className: "slider",
            centerPadding: "90px",
            speed: 2000,
            slidesToShow: 4,
            slidesToScroll: 3,
            centerMode: true,
            rows: 2,
            autoplay: true,
            autoplaySpeed: 2000
        }
        return (
            <section className="wrap-home">
                <div className="home-content">
                    <div className="wrap-slider">
                        <span>현재 상영작</span>
                        {this.state.movies
                            ?(
                                <React.Fragment>
                                    <Slider {...settings}>
                                        {this._renderMovies()}
                                    </Slider>
                                    <div className="resposive">{this._renderMoviesKo()}</div>
                                </React.Fragment>
                            )
                            :<Loading />
                        }
                    </div>
                </div>
            </section>
        );
    }
}

const MovieItem = ({poster, id}) => {
    let path = `detail/${id}`;
    return (
        <div className="wrap-poster">
            <Link className="poster" to={path}>
                <img src={`https://image.tmdb.org/t/p/w200${poster}`}/>
                <span className="hover-text">상세보기</span>
            </Link>
        </div>
    )
}

const MovieItemKo = ({poster, id, title, date}) => {
    let path = `detail/${id}`;
    return (
        <Link className="resposive-link" to={path}>
            <div className="resposive-poster">
                <img src={`https://image.tmdb.org/t/p/w200${poster}`}/>
                <div className="resposive-text">
                    <span>{title}</span>
                    <span>{date}</span>
                </div>
            </div>
        </Link>
    )
}

export default Home;