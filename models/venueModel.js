const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    venueName: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    sports: {
        type: [String],
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    courts: {
        type: [String],
        required: true,
    },
    prices: {
        type: [String],
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
});

const Venue = mongoose.model('venue', venueSchema);

module.exports = Venue;
