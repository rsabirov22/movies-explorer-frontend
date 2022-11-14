import React from 'react';
import Promo from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import Portfolio from '../Portfolio/Portfolio.js';
import Navigation from "../Navigation/Navigation.js";
import './Main.css';

function Main ({ isMenuOpen, onClose }) {
    return (
        <main className='content'>

            <Promo/>

            <AboutProject />

            <Techs />

            <AboutMe />

            <Portfolio />

            <Navigation
              className="navigation navigation_mobile"
              isOpen={isMenuOpen}
              onClose={onClose}
            />

        </main>
    );
}

export default Main;
