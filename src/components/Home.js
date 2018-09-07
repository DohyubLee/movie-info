import React from 'react';
import 'css/Home.css';
import Slider from 'react-slick';

const Home = ({movies}) => {
    console.log(movies)
    const moviesList = movies.map(({poster_path, id}) => {
        return <MovieItem poster={poster_path} key={id} />
    })
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true
    }
    return (
        <section className="wrap-home">
            <div className="home-content">
                <div className="wrap-slider">
                    <span>현재 상영작</span>
                    <Slider {...settings}>
                        {moviesList}
                    </Slider>
                </div>
                <div className="wrap-slider">
                    개봉 예정작
                </div>
            </div>
        </section>
    );
};

const MovieItem = ({poster}) => {
    return (
        <React.Fragment>
            <img src={`https://image.tmdb.org/t/p/w200${poster}`}/>
        </React.Fragment>
    )
}

export default Home;