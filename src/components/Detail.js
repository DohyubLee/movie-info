import React, { Component } from 'react';
import 'css/Detail.css'
import Loading from './Loading'

class Detail extends Component {
    state = {}
    componentDidMount() {
        console.log(this)
        this._getDetail(this.props.match.params.id)
    }
    _callApiDetail = (num) => {
        return fetch(`https://api.themoviedb.org/3/movie/${num}?api_key=dfebf9cfca6fde7ded33adb1b64575ab&language=ko`)
        .then(res => res.json())
        .catch(err => console.log(err))
    }
    _getDetail = async (num) => {
        const movie = await this._callApiDetail(num);
        const credits = await this._callApiCredits(num);
        this.setState({
            movie,
            credits
        })
    }
    _callApiCredits = (num) => {
        return fetch(`https://api.themoviedb.org/3/movie/${num}/credits?api_key=dfebf9cfca6fde7ded33adb1b64575ab&language=ko`)
        .then(res => res.json())
        .then(res => res.cast.slice(0,5))
        .catch(err => console.log(err))
    }
    _renderDetail = () => {
        const { movie, credits } = this.state;
        return <Template movie={movie} credits={credits} />
    }
    render() {
        return (
            <React.Fragment>
                {this.state.movie
                    ?this._renderDetail()
                    :<Loading />
                }
            </React.Fragment>
        );
    }
}

const Template = ({movie, credits}) => {
    return (
        <div className="wrap-detail">
            <div className="detail-top">
                <div className="top-left">
                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
                </div>
                <div className="top-right">
                    <h2>{movie.title}</h2>
                    <h3>장르</h3>
                    {movie.genres.map((genre, index) => <span className="genre" key={index}>{genre.name}</span>)}
                    <h3>개요</h3>
                    <span>{movie.overview}</span>
                </div>
            </div>
            <div className="detail-bottom">
                <Card credits={credits} />
            </div>
        </div>
    )
}

const Card = ({credits}) => {
    return (
        <React.Fragment>
        {credits.map((credit, index) => {
            return (
                <div key={index} className="card">
                    <img src={`https://image.tmdb.org/t/p/w300${credit.profile_path}`} />
                    <div className="container">
                        <h4><b>{credit.name}</b></h4> 
                        <p>{credit.character}</p> 
                    </div>
                </div>
            )
        })}
        </React.Fragment>
    )
}

export default Detail;