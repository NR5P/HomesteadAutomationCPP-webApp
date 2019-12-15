const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const path = require("path");
const bodyParser = require("body-parser");
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
require("./models/irrigationSchema");
const cycleIrrigationSchema = mongoose.model("cycleIrrigationSchema");
const settingsSchema = mongoose.model("settingsSchema");
const irrigationSchema = mongoose.model("irrigationSchema");

/***************handlebars middleware***************************************/
app.set('views', path.join(__dirname, 'views/'));
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
/****************end middleware**********************************************/
/****************body parser middleware**************************************/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
/****************************************************************************/
/***********************method override middlewware***************************/
app.use(methodOverride('_method'));
/****************************************************************************/


app.use(express.static(path.join(__dirname, "public"))); // public folders

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/api/devices",(req,res) => {
    cycleIrrigationSchema.find({

    })
    .then(cycle => {
        irrigationSchema.find({

        })
        .then(irrigate => {
            res.json({
                cycle,
                irrigate
            })
        })
    })
})

app.get("/settings", (req, res) => {
    settingsSchema.find({}).then((setting) => {
        res.render("settings", {
            setting: setting
        });
    });
});

app.post("/settings", (req, res) => {
    const newSetting = {
        userName: req.body.userName,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        timeFormat24Hr: req.body.time-format-24
    }
    new settingsSchema(newSetting)
        .save()
        .then(res.redirect("/")
    )
});

app.get("/cycleIrrigation", (req, res) => {
    res.render("cycleIrrigation");
})

app.get("/irrigation", (req, res) => {
    res.render("irrigation");
})

app.post("/cycleIrrigation", (req, res) => {
    const newCycleIrrigation = {
        pin: req.body.pin,
        name: req.body.name,
        notes: req.body.notes,
        state: req.body.state,
        cycleOnTime: req.body.cycleOnTime,
        cycleOffTime: req.body.cycleOffTime,
        blackoutStartTime: req.body.blackoutStartTime,
        blackoutStopTime: req.body.blackoutStopTime         
    }
    new cycleIrrigationSchema(newCycleIrrigation)
        .save()
        .then(res.redirect("/")
    )
})

app.post("/irrigation", (req, res) => {
    const irrigation = {
        pin: req.body.pin,
        name: req.body.name,
        notes: req.body.notes,
        state: req.body.state,
        cycleOnTime: req.body.cycleOnTime,
        cycleOffTime: req.body.cycleOffTime,
        blackoutStartTime: req.body.blackoutStartTime,
        blackoutStopTime: req.body.blackoutStopTime         
    }
    new irrigationSchema(irrigation)
        .save()
        .then(res.redirect("/")
    )
})

const PORT = process.env.PORT || 5000; // check port number environment variable first
    
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));