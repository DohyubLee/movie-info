import React from 'react';
import 'css/Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="header-content">
                <ul>
                    <li><Link to="/" className="link-icon"><i className="fas fa-film fa-4x"></i></Link></li>
                    <li><Link to="/movie" className="link-text">최신</Link></li>
                    <li><Link to="/movie" className="link-text">인기</Link></li>
                    <li><Link to="/movie" className="link-text">평점</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header;