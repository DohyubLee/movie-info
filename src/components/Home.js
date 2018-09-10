import React, { Component } from 'react';
import 'css/Home.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        const movies = this.props.movies;
        const moviesList = movies.map(({poster_path, id}) => {
            return <MovieItem poster={poster_path} id={id} key={id} />
        })
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
                        <Slider {...settings}>
                            {moviesList}
                        </Slider>
                    </div>
                </div>
            </section>
        );
    }
}

// const Home = ({movies}) => {
//     console.log(movies)
//     const moviesList = movies.map(({poster_path, id}) => {
//         return <MovieItem poster={poster_path} id={id} key={id} />
//     })
//     const settings = {
//         className: "center",
//         centerPadding: "90px",
//         infinite: true,
//         speed: 2000,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         centerMode: true,
//         rows: 2,
//         autoplay: true,
//         autoplaySpeed: 2000, 
//         pauseOnHover: true
//     }
//     return (
//         <section className="wrap-home">
//             <div className="home-content">
//                 <div className="wrap-slider">
//                     <span>현재 상영작</span>
//                     <Slider {...settings}>
//                         {moviesList}
//                     </Slider>
//                 </div>
//             </div>
//         </section>
//     );
// };

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