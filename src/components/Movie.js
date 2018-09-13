import React, { Component } from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis'
import 'css/Movie.css'

class Movie extends Component {
    state = {}
    _callApi = (param) => {
        return fetch(`https://api.themoviedb.org/3/movie/${param}?api_key=dfebf9cfca6fde7ded33adb1b64575ab&language=ko`)
        .then(res => res.json())
        .then(json => json.results)
        .catch(err => console.log(err))
    }
    _getMovies = async (param) => {
        const movies = await this._callApi(param);
        this.setState({
          movies
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps()")
        const param = nextProps.match.params.id;
        this.setState({
            movies: null
        })
        this._getMovies(param)
    }
    componentDidMount() {
        console.log("componentDidMount()")
        console.log("params.id :,",this.props.match.params.id)
        this._getMovies(this.props.match.params.id);
    }
    _renderMovies = () => {
        const { movies } = this.state;
        return <Template movies={movies} />
    }
    render() {
        console.log("render()")
        const param = this.props.match.params.id;
        console.log(this.state)
        return (
            <div className="wrap-movies">
                <div className="movie-content">
                <div className="movie-category">{param.toUpperCase()}</div>
                {this.state.movies
                    ?this._renderMovies()
                    :<Loading />
                }
                </div>
            </div>
        );
    }
}

const Template = ({movies}) => {
    // console.log("movies :",movies)
    return (
        <React.Fragment>
            {movies.map(({title, id, poster_path, overview}) => {
                return (
                    <div className="movie" key={id}>
                        <div className="movie-image">
                            <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} />
                        </div>
                        <div className="movie-description">
                            <h4><b>{title}</b></h4>
                            <h5>
                                <LinesEllipsis 
                                text={overview}
                                maxLine='3'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                                />
                            </h5>
                            <div>
                                <Link className="detail-link" to={`/detail/${id}`}>상세보기</Link>
                            </div>  
                        </div>
                    </div>
                )
            })}
        </React.Fragment>
    )
}

export default Movie;