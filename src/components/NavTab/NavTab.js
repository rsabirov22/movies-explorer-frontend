import React from 'react';
import './NavTab.css';

function NavTab () {

    return (
        <section className='nav-tab'>
            {/* <Link to='aboutProject' className = 'navTab__link' duration={700} smooth={true}>О проекте</Link>
            <Link to='techs' className = 'navTab__link' duration={700} smooth={true}>Технологии</Link>
            <Link to='aboutMe' className = 'navTab__link' duration={700} smooth={true}>Студент</Link> */}
            <nav className="nav-tab__menu">
              <ul className="nav-tab__list">
                <li>
                  <a href='aboutProject' className = 'nav-tab__link'>О проекте</a>
                </li>
                <li>
                  <a href='techs' className = 'nav-tab__link'>Технологии</a>
                </li>
                <li>
                  <a href='aboutMe' className = 'nav-tab__link'>Студент</a>
                </li>
              </ul>
            </nav>  
        </section>       
    );
}

export default NavTab;
