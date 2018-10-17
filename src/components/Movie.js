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
    //props 변경에 따른 상태 변화 라이프사이클
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps()")
        if (this.props.match.params.id !== nextProps.match.params.id) {
            const param = nextProps.match.params.id;
            //로딩 효과를 주기위해 null로 초기화`
            this.setState({
                movies: null
            })
            this._getMovies(param)
        }
    }
    componentDidMount() {
        // console.log("componentDidMount()")
        // console.log("params.id :,",this.props.match.params.id)
        this._getMovies(this.props.match.params.id);
    }
    _renderMovies = () => {
        const { movies } = this.state;
        return <Template movies={movies} />
    }
    render() {
        console.log("render()")
        const param = this.props.match.params.id;
        // console.log(this.state)
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
    const defaultPath = "/movie-info"
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
                                <Link className="detail-link" to={defaultPath + `/detail/${id}`}>상세보기</Link>
                            </div>  
                        </div>
                    </div>
                )
            })}
        </React.Fragment>
    )
}

export default Movie;