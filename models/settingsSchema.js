const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema ({
    userName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: Number
    }
})

mongoose.model("settingsSchema", settingsSchema);