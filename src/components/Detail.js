import React from 'react';
import 'css/Detail.css'

const Detail = ({match, movie,  _getDetail}) => {
    console.log("movie: ", movie)
    if (Number(match.params.id) !== movie.id) {
        _getDetail(match.params.id)
        return (
            <Template />
        )
    } else {
        return (
            <Template />
        );
    }  
};

const Template = () => {
    return (
        <div>
            여긴 디테일 
        </div>
    )
}

export default Detail;