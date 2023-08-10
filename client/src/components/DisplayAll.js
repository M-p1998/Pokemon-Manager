
import {useState, useEffect} from "react";
import React from 'react'
import axios from "axios";
import {Link,useNavigate } from "react-router-dom";
import display from "../css/Display.css"


const DisplayAll = () => {

    const [pokemonParty, setPokemonParty] = useState([])
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get("http://localhost:8000/api/pokemon")
        .then((res) => {
            console.log("Got all pokemon",res.data)
            setPokemonParty(res.data)
        })
        .catch((err) =>{
            console.log("Something went wrong: ", err)
        })

    }, [])

    const deleteHandler = (idFromMap) =>{
        axios.delete(`http://localhost:8000/api/pokemon/${idFromMap}`)
        .then((res) =>{
            console.log("Deleted Pokemon:", res)
            const newPokemonParty = pokemonParty.filter((allOtherPokemon) => allOtherPokemon._id !== idFromMap)
            setPokemonParty(newPokemonParty)
        })
        .catch((err) =>{
            console.log("Something went wrong: ", err)
        })

    }

  return (
    <div>
        <h2 className="space">Pokemon Party</h2>
        <div className="poke-party">
            {
                pokemonParty.map((onePokemon) => (
                    <div className="pokemon-card" key={onePokemon._id}>
                        <h3>{onePokemon.name.charAt(0).toUpperCase() + onePokemon.name.slice(1)}</h3>
                        <p>Nickname: {onePokemon.nickname.charAt(0).toUpperCase() + onePokemon.nickname.slice(1)}</p>
                        <Link to={`/displayOne/${onePokemon._id}`}><img src={onePokemon.image} alt={onePokemon.name} /></Link>
                        <p>Type: {onePokemon.type}</p>
                        <div className="card-buttons">
                            <button className="green-btn" onClick={() => navigate(`/editOne/${onePokemon._id}`)}>Edit</button>
                            <button className="red-btn" onClick={() => deleteHandler(onePokemon._id)}>Delete</button>

                        </div>
                    </div>
        
                ))
            }

        </div>
    </div>
  )
}

export default DisplayAll;