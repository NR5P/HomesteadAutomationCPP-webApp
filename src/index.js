const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const {singleToDoubleDigit} = require("./customMiddleware/customMiddleware.js");

const app = express();

//connect to database
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Orangev8z",
    database : "homestead"
});
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("mysql connected...")
});

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
/**********************custom middleware*********************************** */
app.use(singleToDoubleDigit);
/****************************************************************************/



app.use(express.static(path.join(__dirname, "public"))); // public folders

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/api/devices",(req,res) => {
    /*
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
    */
})

app.get("/settings", (req, res) => {
    /*
    settingsSchema.find({}).then((setting) => {
        res.render("settings", {
            setting: setting
        });
    });
    */

});

app.post("/settings", (req, res) => {
   const sql = `INSERT INTO settings (userName, password, phoneNumber, email, timeFormat24Hr) VALUES (
    ${req.body.userName}, ${req.body.password}, ${req.body.phoneNumber}, ${req.body.email}, ${req.body.time-format-24} 
   )`;
   db.query(sql, function(err, result) {
        if(err) throw err;
   });
});

app.get("/cycleIrrigation", (req, res) => {
    res.render("cycleIrrigation");
});

app.get("/irrigation", (req, res) => {
    res.render("irrigation");
});

app.post("/cycleIrrigation", (req, res) => {
    const sql = `INSERT INTO cycleIrrigation (pin, name, notes, state, cycleOnTimeHr, cycleOnTimeMin, cycleOnTimeSec,
                 cycleOffTimeHr, cycleOffTimeMin, cycleOffTimeSec, blackoutStartTime, blackoutStopTime) VALUES (
                 ${req.body.pin}, ${req.body.name}, ${req.body.notes}, ${req.body.state}, ${req.body.cycleOnTimeHr},
                 ${req.body.cycleOnTimeMin}, ${req.body.cycleOnTimeSec}, ${req.body.cycleOffTimeHr}, ${req.body.cycleOffTimeMin},
                 ${req.body.cycleOffTimeSec}, ${req.body.blackoutStartTime}, ${req.body.blackoutStopTime})
                 )`;
   db.query(sql, function(err, result) {
        if(err) throw err;
   });
});

app.post("/irrigation", (req, res) => {
   let cycleLengthArray = []
   req.body.cycleOnTimeHr.map((element, index) => {
        cycleLengthArray[index] = `0000-00-00T${req.body.cycleOnTimeHr[index]}:${req.body.cycleOnTimeMin[index]}:${req.body.cycleOnTimeSec[index]}`;
   })
   let sql = `BEGIN 
                INSERT INTO irrigation (pin, name, notes, state) VALUES (
                ${req.body.pin}, ${req.body.name}, ${req.body.notes}, ${req.body.state}
                );
                INSERT INTO irrigationRunTimes (irrigationId, runTime, startTime) VALUES`
                cycleLengthArray.forEach((item, index) => {
                    if (index !== 0) {sql += ", "}
                    sql += `(LAST_INSERT_ID(), ${item}, ${req.body.onTime})`
                })
                sql += " COMMIT;";

   db.query(sql, function(err, result) {
        if(err) throw err;
   });
});

const PORT = process.env.PORT || 5000; // check port number environment variable first
    
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));