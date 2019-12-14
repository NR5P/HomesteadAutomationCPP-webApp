const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cycleIrrigationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        default: 2
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

});

mongoose.model("irrigationSchema", cycleIrrigationSchema);