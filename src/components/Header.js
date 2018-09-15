import React from 'react';
import 'css/Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    const defaultPath = "/movie-info"
    return (
        <header>
            <div className="header-content">
                <ul>
                    <li><Link to={defaultPath + "/"} className="link-icon"><i className="fas fa-film fa-4x"></i></Link></li>
                    <li><Link to={defaultPath + "/movie/popular"} className="link-text">인기</Link></li>
                    <li><Link to={defaultPath + "/movie/top_rated"} className="link-text">평점</Link></li>
                    <li><Link to={defaultPath + "/movie/upcoming"} className="link-text">예정</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header;