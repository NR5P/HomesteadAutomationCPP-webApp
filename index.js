const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

//connect to database
mongoose.connect("mongodb://localhost/homestead", {
    useNewUrlParser: true
}).then(() => console.log("mongoDB connected..."))
  .catch((err) => console.log(err));

//load database models
require("./models/cycleIrrigationSchema");
require("./models/settingsSchema");
const cycleIrrigationSchema = mongoose.model("cycleIrrigationSchema");
const settingsSchema = mongoose.model("settingsSchema");

/***************handlebars middleware***************************************/
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
/****************end middleware**********************************************/

app.use(express.static(path.join(__dirname, "web"))); // public folders

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/settings", (req, res) => {
    res.render("settings");
})

const PORT = process.env.PORT || 5000; // check port number environment variable first
    
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));