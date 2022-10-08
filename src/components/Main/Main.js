import React from 'react';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import './Main.css';

function Main () {

    return (
        <main className='content'>

            <AboutProject />

            <Techs />

            <AboutMe />

        </main>
    );
}

export default Main;
