
const mongoose = require("mongoose")

const PokemonSchema = new mongoose.Schema({
    name: {
        type: String 
    },
    type: {
        type: String
    },
    image:{
        type: String
    },
    nickname: {
        type: String,
        required: [true, "Nickname is required"],
        minLength: [3, "Nickname must be at least 3 characters"]
    }

},{timestamps: true})

const Pokemon = mongoose.model("Pokemon", PokemonSchema)
module.exports = Pokemon