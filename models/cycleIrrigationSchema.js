const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cycleIrrigationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    whenCreated: {
        type: Date,
        default: Date.now
    },
    cycleOnTime: {
        type: Date,
        required: false
    },
    cycleOffTime: {
        type: Date,
        required: false
    },
    blackoutStartTime: {
        type: Date,
        required: false
    },
    blackoutStopTime: {
        type: Date,
        required: false
    }
});

mongoose.model("cycleIrrigationSchema", cycleIrrigationSchema);