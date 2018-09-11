import React from 'react';
import 'css/Detail.css'

const Detail = ({match, movie,  _getDetail, _getCredits, credits}) => {
    if (Number(match.params.id) !== movie.id) {
        _getDetail(match.params.id)
        _getCredits(match.params.id)
        return (
            <Template movie={movie} credits={credits} />
        )
    } else {
        return (
            <Template movie={movie} credits={credits} />
        );
    }  
};

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
    if (credits) {
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
    } else {
        return (
            <span>...Loading</span>
        )
    }
}

export default Detail;