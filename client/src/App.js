
import './App.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import PokeBall from "./img/pokeball.png";
import CreateOne from './components/CreateOne';
import DisplayAll from "./components/DisplayAll";
import DisplayOne from "./components/DisplayOne";
import EditOne from "./components/EditOne";
import styles from "./css/Style.css"



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <nav>
        <Link to={"/"}> <img src={PokeBall}  alt="logo" /> </Link>
        <h1>Poke Center</h1>
        <Link to={"/pokedex"}>Pokedex</Link>
      </nav>
      <Routes>

        {/* <Route path='/pokedex' element={<CreateOne /> }/>
        <Route path='/' element={<DisplayAll /> }/>
        <Route path='/displayOne' element={<DisplayOne /> }/>
        <Route path="/editOne" element={<EditOne /> }/> */}

        <Route path="/pokedex" element={<CreateOne />} />
        <Route path="/" element={<DisplayAll />} />
        <Route path="/displayOne/:id" element={<DisplayOne />} />
        <Route path="/editOne/:id" element={<EditOne />} />

      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
