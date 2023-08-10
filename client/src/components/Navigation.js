
import React from 'react'
import {Link} from "react-router-dom";
import PokeBall from "../img/pokeball.png";

const Navigation = ({currentRoute}) => {
  return (
    <nav>
      <Link to={"/"}>
        {/* <img src={PokeBall} alt="logo" /> */}
      </Link>
      {currentRoute === "/pokedex" ? (
        <Link to={"/pokedex"}>Poke Party</Link>
      ) : (
        <Link to={"/pokedex"}>Poke Pokedex</Link>
      )}
    </nav>
  )
}

export default Navigation