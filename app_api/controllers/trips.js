const mongoose = require('mongoose');
require('../models/travlr');

const Model = mongoose.model('trips');

// GET: /api/trips
// Return all trips
const tripsList = async (req, res) => {
    const q = await Model
        .find({})
        .exec();

    if (!q) {
        return res
            .status(404)
            .json({ "message": "No trips found" });
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// POST: /api/trips
// Add a new trip
const tripsAddTrip = async (req, res) => {
    console.log(req.body);

    try {
        const q = await Model.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        return res
            .status(201)
            .json(q);

    } catch (err) {
        return res
            .status(400)
            .json(err);
    }
};

// PUT: /api/trips/:tripCode
// Update an existing trip
const tripsUpdateTrip = async (req, res) => {
    console.log(req.params);
    console.log(req.body);

    try {
        const q = await Model
            .findOneAndUpdate(
                { 'code': req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                { new: true }
            )
            .exec();

        if (!q) {
            return res
                .status(400)
                .json({ "message": "Trip not found" });
        } else {
            return res
                .status(201)
                .json(q);
        }

    } catch (err) {
        return res
            .status(400)
            .json(err);
    }
};

// GET: /api/trips/:tripCode
// Return one trip matching tripCode
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode })
        .exec();

    if (!q || q.length === 0) {
        return res
            .status(404)
            .json({ "message": "Trip not found" });
    } else {
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsFindByCode
};