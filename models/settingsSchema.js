const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema ({
    userName: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    }
    /*
    password: {
        type: password,
        required: false
    },
    email: {
        type: email,
        required: false
    }
    */
})

mongoose.model("settingsSchema", settingsSchema);