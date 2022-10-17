import React from 'react';
import { Link } from 'react-scroll';
import './NavTab.css';

function NavTab () {

    return (
        <section className='nav-tab'>
            <nav className="nav-tab__menu">
              <ul className="nav-tab__list">
                <li>
                  <Link to='aboutProjectId' className = 'nav-tab__link' duration={800} smooth={true}>О проекте</Link>
                </li>
                <li>
                  <Link to='techsId' className = 'nav-tab__link' duration={800} smooth={true}>Технологии</Link>
                </li>
                <li>
                  <Link to='aboutMeId' className = 'nav-tab__link' duration={800} smooth={true}>Студент</Link>
                </li>
              </ul>
            </nav>  
        </section>       
    );
}

export default NavTab;
