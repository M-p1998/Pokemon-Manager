

import React from 'react'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react"
import axios from "axios"

const DisplayOne = () => {
    const {id} = useParams()

    const[onePokemon, setOnePokemon] = useState({})

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/pokemon/${id}`)
        .then((res) => {
            console.log("One Pokemon", res.data)
            setOnePokemon(res.data)
        })
        .catch((err) =>{
            console.log("Something went wrong:", err)
        })
    }, [])


  return (
    <div>
        <h2 className='space'>Pokemon Details</h2>
        <div className="pokemon-card">
            <h4>Name: {onePokemon.name}</h4>
            <h5>Nickname: {onePokemon.nickname}</h5>
            <img alt="a pokemon" src={onePokemon.image} />
            <p>Type: {onePokemon.type}</p>
        </div>
        
    </div>
  )
}

export default DisplayOne