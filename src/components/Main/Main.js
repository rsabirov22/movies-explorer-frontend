import React from 'react';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import Portfolio from '../Portfolio/Portfolio.js';
import './Main.css';

function Main () {

    return (
        <main className='content'>

            <AboutProject />

            <Techs />

            <AboutMe />

            <Portfolio />

        </main>
    );
}

export default Main;
