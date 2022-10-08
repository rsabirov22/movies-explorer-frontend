import {Route, Switch, Link } from 'react-router-dom';

import Header from "../Header/Header";
import Promo from '../Promo/Promo.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import NavTab from '../NavTab/NavTab.js';
import './App.css';

function App() {
  return (
    <div className="page">
      
      <Switch>
        <Route exact={true} path = '/'>

          <Header
            className="header"
          >
            <div className="header__authorize">
              <Link className="header__signup" to="/signup">Регистрация</Link>
              <button className="header__signin" type='button'>Войти</button>
            </div>
          </Header>

          <Promo/>

          <NavTab />

          <Main />

          <Footer />

        </Route>
      </Switch>

    </div>
  );
}

export default App;
