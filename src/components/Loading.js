import React from 'react';
import 'css/Loading.css';

const Loading = () => {
    return (
        <div className="wrap-loading">
            <div className="loading-content">
                <i className="fas fa-circle-notch fa-spin fa-4x"></i>
            </div>
        </div>
    );
};

export default Loading;