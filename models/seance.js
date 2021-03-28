const joi = require("joi");
const mongoose = require("mongoose");

const seanceSchema = new mongoose.Schema({
    date: String,
    temp: String,
    nbPlaceDspo: Number
})

let seance_validation_schema = joi.object({
    date: joi.date().required(),
    temp: joi.date().required(),
    nbPlaceDspo: joi.number().positive().required(),
    
})

function seance_validation(body) {
    return seance_validation_schema.validate(body);
}

const seance = mongoose.model("Seance", seanceSchema);

module.exports.Seance = seance;
module.exports.seance_validation = seance_validation;