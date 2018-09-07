import React from 'react';
import { BrowserRouter } from 'react-router-dom'; //페이지 새로고침없이 주소교체가능
import App from './App';

const Root = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

export default Root;