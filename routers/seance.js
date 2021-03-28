const _ = require("lodash");
const router = require("express").Router();
const { Seance, seance_validation } = require("../models/seance");

router.get("", async (req, res) => {
    res.send(await Seance.find())
})

router.get("/:id", async (req, res) => {
    let seance = await Seance.findById(req.params.id);
    if (!seance) {
        res.status(404).send("Not Found !!!")
    }
    res.send(seance);
})

router.post("", async (req, res) => {
    let validation = seance_validation(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    let seance = new Seance({
        date: req.body.date,
        temp: req.body.temp,
        nbPlaceDspo: req.body.nbPlaceDspo

    })
    seance = await seance.save();
    res.status(201).send(seance);
})

router.put("/:id", async (req, res) => {
    let seance = await Seance.findById(req.params.id);
    if (!seance) {
        res.status(404).send("Not Found !!!")
    }
    seance = _.merge(seance, req.body);
    seance = await seance.save();
    res.status(201).send(seance);
})

router.put("/reservation/:id", async (req, res) => {
    let seance = await Seance.findById(req.params.id);
    if (!seance) {
        res.status(404).send("Not Found !!!")
    }
    if (seance.nbPlaceDspo <= 0) {
        res.status(404).send("There is no place for reservation !!!")
    } else if ((seance.nbPlaceDspo - req.body.nbReservation) < 0) {
        res.status(404).send("There is no place for reservation !!!")
    } else {
        seance.nbPlaceDspo -= 1;
        seance = await seance.save();
        res.send(seance);
    }

})


router.delete("/:id", async (req, res) => {
    let seance = await Seance.findByIdAndDelete(req.params.id)
    if (!seance) {
        res.status(404).send("Seance not found !!")
    }
    res.send(seance);
})

module.exports = router;