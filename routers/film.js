const _ = require("lodash");
const mongoose = require("mongoose");
const { Film, film_validation } = require("../models/film");
const router = require("express").Router();
const { Seance } = require("../models/seance")

router.get("", async (req, res) => {
    res.send(await Film.find().populate("seance.id"));
})

router.get("/:id", async (req, res) => {
    let film = await Film.findById(req.params.id).populate("seance.id");
    if (!film) {
        res.status(404).send("Not Found !!!")
    }
    res.send(film);
})

router.post("", async (req, res) => {
    let validation = film_validation(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    let found = true;
    req.body.seance.forEach(async (element) => {
        let seance = await Seance.findById(element.id);
        if (!seance) {
            found = false;
        }
    });

    if (found) {
        let film = new Film({
            nom: req.body.nom,
            acteur: req.body.acteur,
            seance: req.body.seance
        })
        film = await film.save();
        res.status(201).send(film);
    } else {
        res.status(404).send("Seance not found");
    }
})

router.put("/:id", async (req, res) => {
    let film = await Film.findById(req.params.id);
    if (!film) {
        res.status(404).send("Not Found !!!")
    }
    film = _.merge(film, req.body);
    film = await film.save();
    res.send(film);
})

router.delete("/:id", async (req, res) => {
    let film = await Film.findByIdAndDelete(req.params.id)
    if (!film) {
        res.status(404).send("Film not found !!")
    }
    res.send(film);
})

module.exports = router;