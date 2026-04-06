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
    tripsFindByCode
};