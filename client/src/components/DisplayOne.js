

import React from 'react'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react"
import axios from "axios"
import displayOne from "../css/DisplayOne.css"


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
        <h2 >Pokemon Details</h2>
        <div className="one">
            <h4>Name: {onePokemon.name}</h4>
            <h6>Nickname: {onePokemon.nickname}</h6>
            <img alt="a pokemon" src={onePokemon.image} />
            <h6>Type: {onePokemon.type}</h6>
        </div>
        
    </div>
  )
}

export default DisplayOne