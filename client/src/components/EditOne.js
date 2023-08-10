

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useEffect, useState } from 'react';


const EditOne = () => {
    const {id} = useParams() // path variable
    const [onePokemon, setOnePokemon] = useState({})
    const[newNickname, setNewNickname] = useState("")
    const navigate = useNavigate()

    useEffect(() =>{
        axios
        .get(`http://localhost:8000/api/pokemon/${id}`)
        .then((res) =>{
            console.log("Res.Data (EditOne.js)", res.data)
            setOnePokemon(res.data)
            setNewNickname(res.data.nickname)
        })
        .catch((err) =>{
            console.log("Something went wrong: ", err)
        })
    }, [])

    const submitHandler = (e) =>{
        const payload = {...onePokemon, nickname: newNickname}
         e.preventDefault()
         axios
              .put(`http://localhost:8000/api/pokemon/${id}`, payload)
              .then((res) =>{
                console.log("Res.data (EditOne.js)", res.data)
                navigate("/")

              })
              .catch((err) =>{
                console.log("Something went wrong: ", err)
              })
    }

  return (
    <>
    <h2>Edit Pokemon</h2>
    <form onSubmit={submitHandler}>
        <div >
            <h4>Name: {onePokemon.name} </h4>
            <label>Nickname </label>
            <input type="text" id="new-nickname" value={newNickname} onChange={(e) => setNewNickname(e.target.value) }/>
            <img src={onePokemon.image} alt="a pokemon"/>
            <p>Type: {onePokemon.type}</p>
        </div>
        <input type="submit" value="Edit Pokemon" />
    </form>
    </>
  )
}

export default EditOne