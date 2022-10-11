import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css'

function Navigation ({isOpen, onClose}) {
    return (
        <div className={"navigation" +  (isOpen?' navigation_visible':'')}>
            {/* <div className="navigation__container"> */}
                <nav className="navigation__links">
                    <Link to='/movies' className="navigation__link">Фильмы</Link>
                    <Link to='/saved-movies' className="navigation__link">Сохраненные фильмы</Link>
                </nav>
                <Link to='/profile' className="navigation__profile">
                  <p className="navigation__profile-text">Аккаунт</p>
                  <span className="navigation__profile-icon"></span>
                </Link>
                <button className="navigation__close-menu" onClick={onClose} type='button' />
            {/* </div>     */}
        </div>
    )
}

export default Navigation;
