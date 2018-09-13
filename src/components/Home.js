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
    _getMovies = async () => {
        const movies = await this._callApi();
        this.setState({
          movies
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
    render() {
        const settings = {
            className: "center",
            centerPadding: "90px",
            infinite: true,
            speed: 2000,
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: true,
            rows: 2,
            autoplay: true,
            autoplaySpeed: 2000, 
            pauseOnHover: true
        }
        return (
            <section className="wrap-home">
                <div className="home-content">
                    <div className="wrap-slider">
                        <span>현재 상영작</span>
                        {this.state.movies
                            ?(
                                <Slider {...settings}>
                                    {this._renderMovies()}
                                </Slider>
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
            <Link className="poster" to={path}><img src={`https://image.tmdb.org/t/p/w200${poster}`}/>
            <span className="hover-text">상세보기</span></Link>
        </div>
    )
}

export default Home;