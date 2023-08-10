
import React from 'react';
import PokeBall from "../img/pokeball.png";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


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
        setPokeList({...pokeList, [e.target.name]:e.target.value})

    }

    const searchHandler = () =>{
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
            .catch((err) =>{
                console.log("Something went wrong:", err)
                setErrors({...errors, searchErrors: "Must be a valid Pokemon Name"})
            })
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        axios
            .post("http://localhost:8000/api/pokemon", pokeList)
            .then((res) =>{
                console.log("Success! You add a pokemon to your party", res.data)
                setErrors({})
                navigate("/")
            })
            .catch((err) =>{
                console.log("Something went wrong (CreateOne.js) ", err)
                setErrors({...errors, postErrors: err.response.data.errors})
            })
    }

  return (
    <>
        <h2 className="space">Add Pokemon</h2>
        <form onSubmit={submitHandler} id="pokedex">
            <div id="left">
                <div id="logo"></div>
                <div id="bg_curve1_left"></div>
                <div id="bg_curve2_left"></div>
                <div id="curve1_left">
                    <div id="buttonGlass">
                        <div id="reflect"></div>
                    </div>
                    <div id="miniButtonGlass1"></div>
                    <div id="miniButtonGlass2"></div>
                    <div id="miniButtonGlass3"></div>
                </div>
            <div id="curve2_left">
                <div id="junction">
                    <div id="junction1"></div>
                    <div id="junction2"></div>
                </div>
            </div>
            <div id="screen">
                <div id="topPicture">
                    <div id="buttontopPicture1"></div>
                    <div id="buttontopPicture2"></div>
                </div>
                {/* ************ */}
                <div id="picture">
                    <img id="sprite-pic" src={pokeList.image} alt="Pokemon" height="170"/>
                </div>
                {/* *************** */}
                <div id="buttonbottomPicture"></div>
                <div id="speakers">
                    <div className="sp"></div>
                    <div className="sp"></div>
                    <div className="sp"></div>
                    <div className="sp"></div>

                </div>
            </div>
            {/* ********************** */}
            <button type="button" id="bigbluebutton" onClick={searchHandler}></button>
            {/* search button */}
            
        </div>
        <div id="right">

            {/* workspace */}
           
            <div id="stats">
                <div>
                    <label htmlFor="">PokeSearch</label>
                    {/* here is what we wiil have entier pokemon names to request data */}
                    {errors.searchErrors ? <p className='errors'>{errors.searchErrors}</p> : null}
                    <input type="text" id="search-bar" placeholder="Polemon Names" name="name" onChange={changeHandler}/>
                </div>
                {pokeList.name !== "" && pokeList.type !== "" ?
                <ul id="stats-list">
                {/* display all the pokemon */}
                
                    <li>Name: {pokeList.name.charAt(0).toUpperCase() + pokeList.name.slice(1)}  |</li>
                    <li>Type: {pokeList.type.charAt(0).toUpperCase() + pokeList.type.slice(1)}</li>

                    <div id="nickname-wrapper">
                    {/* {errors?.nickname ? <p id="red">{errors?.nickname.message}</p> : null} */}
                    <label htmlFor="">Nickname: </label>
                    <input type="text" name="nickname" id="search-bar" placeholder="Please nickname your pokemon" onChange={changeHandler} />
                    <input type="submit" value="Add to Party" />
                    {errors.postErrors ? <p className='errors'>{errors.postErrors}</p> : null}
                    </div>
                </ul>
                : null}
                
            </div>
            {/* workspace */}

            
        </div>
        </form>
    </>
  )
}

export default CreateOne