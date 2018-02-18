import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Leaderboard from './app/Leaderboard';

const render = () => {
    ReactDOM.render(
        <Leaderboard/>,
        document.getElementById('root')
    )
};

render();
