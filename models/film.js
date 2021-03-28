const joi = require("joi");
const joiObjectid = require("joi-objectid");
joi.ObjectId = require("joi-objectid")(joi);
const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
    nom: String,
    acteur: [String],
    seance: [{id: { type: mongoose.Schema.Types.ObjectId, ref: "Seance" }}]
})

let film_validation_schema = joi.object({
    nom: joi.string().required(),
    acteur: joi.array().required().items(joi.string().required().min(1)),
    seance: joi.array().required().items({id:joi.ObjectId()})
})

function film_validation(body) {
    return film_validation_schema.validate(body);
}

const film = mongoose.model('Film', filmSchema);

module.exports.Film = film;
module.exports.film_validation = film_validation;