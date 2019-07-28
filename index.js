const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

/***************handlebars middleware***************************************/
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
/****************end middleware**********************************************/

app.use(express.static(path.join(__dirname, "web"))); // static folders

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/settings", (req, res) => {
    res.render("settings");
})

const PORT = process.env.PORT || 5000; // check port number environment variable first
    
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));