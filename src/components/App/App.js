import Header from "../Header/Header";
import Promo from '../Promo/Promo.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import NavTab from '../NavTab/NavTab.js';
import './App.css';

function App() {
  return (
    <div className="page">

        <Header></Header>

        <Promo/>

        <NavTab />

        <Main />

        <Footer />

    </div>
  );
}

export default App;
