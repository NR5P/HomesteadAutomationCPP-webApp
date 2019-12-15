const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cycleIrrigationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        default: 1
    },
    pin: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    state: {
        type: String,
        default: "off"
    },
    whenCreated: {
        type: Date,
        default: Date.now
    },
    cycleOnTimeHour: {
        type: Number,
        required: false
    },
    cycleOnTimeMin: {
        type: Number,
        required: false
    },
    cycleOnTimeSec: {
        type: Number,
        required: false
    },
    cycleOffTimeHour: {
        type: Number,
        required: false
    },
    cycleOffTimeMin: {
        type: Number,
        required: false
    },
    cycleOffTimeSec: {
        type: Number,
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