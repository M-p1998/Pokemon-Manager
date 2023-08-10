
import React from 'react';
import PokeBall from "../img/pokeball.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from "../css/Add.css";


const CreateOne = () => {

    const [pokeList, setPokeList] = useState({
        name: "",
        nickname: "",
        image: PokeBall,
        type: ""
    })

    const [errors, setErrors] = useState({
        searchErrors: "",
        postErrors: ""
    })

    const navigate = useNavigate()

    const changeHandler = (e) => {
        setPokeList({ ...pokeList, [e.target.name]: e.target.value })

    }

    const searchHandler = () => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokeList.name.toLowerCase()}`)
            .then((res) => {
                console.log(res.data)
                setPokeList({
                    name: res.data.name,
                    image: res.data.sprites.front_shiny,
                    type: res.data.types[0].type.name

                })

            })
            .catch((err) => {
                console.log("Something went wrong:", err)
                setErrors({ ...errors, searchErrors: "Must be a valid Pokemon Name" })
            })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios
            .post("http://localhost:8000/api/pokemon", pokeList)
            .then((res) => {
                console.log("Success! You add a pokemon to your party", res.data)
                setErrors({})
                navigate("/")
            })
            .catch((err) => {
                console.log("Something went wrong (CreateOne.js) ", err)
                setErrors({ ...errors, postErrors: err.response.data.errors })
            })
    }

    return (
        <>
            <h2 >Add Pokemon</h2>
            <form onSubmit={submitHandler} >

                <div>
                <img src={pokeList.image} alt="Pokemon" height="200" />
                <button type="button" onClick={searchHandler}>
                    Click Me
                </button>
                </div>

                <div>
                    <label htmlFor="">PokeSearch</label>
                    {errors.searchErrors ? <p className='errors'>{errors.searchErrors}</p> : null}
                    <input type="text" placeholder="Polemon Names" name="name" onChange={changeHandler} />
                </div>
                {pokeList.name !== "" && pokeList.type !== "" ? (
                    <ul>

                        <li>Name: {pokeList.name.charAt(0).toUpperCase() + pokeList.name.slice(1)}  |</li>
                        <li>Type: {pokeList.type.charAt(0).toUpperCase() + pokeList.type.slice(1)}</li>

                        <div>

                            <label htmlFor="nickname">Nickname: </label>
                            <input type="text" name="nickname" placeholder="Please nickname your pokemon" onChange={changeHandler} />
                            <input type="submit" value="Add to Party" />
                            {errors.postErrors ? <p className='errors'>{errors.postErrors}</p> : null}
                        </div>
                    </ul>
     ) : null
                }




            </form>

            



        </>
    )
}

export default CreateOne