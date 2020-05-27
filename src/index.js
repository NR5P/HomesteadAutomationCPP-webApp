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
    database : "homestead",
    multipleStatements : true
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

app.get("/api/irrigationDevices",(req,res) => {
    let irrigationDevices = [];
    const sql = `SELECT irrigation.id, irrigation.pin, irrigation.name, irrigation.notes, irrigation.state, irrigation.daysToIrrigate, irrigationRunTimes.runTime, irrigationRunTimes.startTime FROM irrigation JOIN irrigationRunTimes ON irrigation.id = irrigationRunTimes.irrigationId;`;
    db.query(sql, function(error, results, fields) {
        if (error) throw error;
        let cycleObject;
        results.forEach(element => {
            if (cycleObject !== undefined && element.id == cycleObject.id) {
                cycleObject.cycleOnTimeArray.push(element.runTime);
                cycleObject.startTimesArray.push(element.startTime);
            } else {
                if (cycleObject !== undefined && Object.keys(cycleObject).length !== 0) {
                    irrigationDevices.push(cycleObject); 
                }
                cycleObject = {};
                cycleObject.cycleOnTimeArray = []
                cycleObject.startTimesArray = []
                cycleObject.id = element.id;
                cycleObject.pin = element.pin;
                cycleObject.name = element.name;
                cycleObject.notes = element.notes;
                cycleObject.state = element.state;
                cycleObject.daysToIrrigate = element.daysToIrrigate;
                cycleObject.cycleOnTimeArray.push(element.runTime);
                cycleObject.startTimesArray.push(element.startTime);
            }
            irrigationDevices.push(cycleObject); 
        });
        res.json(irrigationDevices);
    })
})

app.post("/irrigation", (req, res) => {
    let runTimeArray = [];
    let startTimeArray = [];
    let index = 0;
    runTimeArray[index] = `0000-00-00T${req.body.cycleOnTimeHr}:${req.body.cycleOnTimeMin}:${req.body.cycleOnTimeSec}`;
    if (req.body.cycleOnTimeHr instanceof Array) {
        runTimeArray = req.body.cycleOnTimeHr.map((element, index) => {
                return `0000-00-00T${req.body.cycleOnTimeHr[index]}:${req.body.cycleOnTimeMin[index]}:${req.body.cycleOnTimeSec[index]}`;
        })
    } 
    startTimeArray[index] = req.body.onTime;
    if (req.body.onTime instanceof Array) {
        startTimeArray = req.body.onTime.map((element, index) => {
            return element;
        })
    } 

    const daysToIrrigateString = req.body.monday + " " + req.body.tuesday + " " + req.body.wendesday + " " + req.body.thursday + " " + req.body.friday + " " + req.body.saturday + " " + req.body.sunday;
    console.log(daysToIrrigateString);

   const irrigationData = {
       pin : req.body.pin,
       name : req.body.name,
       notes : req.body.notes,
       state : req.body.state,
       daysToIrrigate : daysToIrrigateString
   }
   db.beginTransaction(function(err) {
        db.query('INSERT INTO irrigation SET ?', irrigationData, function(error, results, fields) {
            if (error) {
                return db.rollback(function() {
                    throw error;
                });
            }
            const irrigationEntryId = results.insertId;
            let irrigationRunTimeData = runTimeArray.map((element, index) => {
                return [irrigationEntryId, runTimeArray[index], startTimeArray[index]]
            })
            db.query('INSERT INTO irrigationRunTimes (irrigationId, runTime, startTime) VALUES ?', [irrigationRunTimeData], function() {
                if (error) {
                    return db.rollback(function() {
                        throw error;
                    });
                }
                db.commit(function(err) {
                    if (err) {
                        return db.rollback(function() {
                            throw err;
                        });
                    }
                    res.render("index");
                })
            })
        })
   })
});

app.put("/irrigation", (req, res) => {
    const weekdays = ["monday", "tuesday", "wendesday", "thursday", "friday", "saturday", "sunday"];
    let runTimeArray = [];
    let startTimeArray = [];
    let index = 0;
    runTimeArray[index] = `0000-00-00T${req.body.cycleOnTimeHr}:${req.body.cycleOnTimeMin}:${req.body.cycleOnTimeSec}`;
    if (req.body.cycleOnTimeHr instanceof Array) {
        runTimeArray = req.body.cycleOnTimeHr.map((element, index) => {
                return `0000-00-00T${req.body.cycleOnTimeHr[index]}:${req.body.cycleOnTimeMin[index]}:${req.body.cycleOnTimeSec[index]}`;
        })
    } 
    startTimeArray[index] = req.body.onTime;
    if (req.body.onTime instanceof Array) {
        startTimeArray = req.body.onTime.map((element, index) => {
            return element;
        })
    } 

    let daysOfWeekToIrrigate = "";

    weekdays.forEach((day) => {
        if (req.body[day] !== "undefined" && req.body[day] !== null) {
            daysOfWeekToIrrigate += day.charAt(0).toUpperCase() + day.slice(1) + " ";
        }
    })

    const irrigationData = {
       pin : req.body.pin,
       name : req.body.name,
       notes : req.body.notes,
       state : req.body.state,
       daysToIrrigate : daysOfWeekToIrrigate
    }
    db.beginTransaction(function(err) {
        db.query("UPDATE irrigation SET name = ?, pin = ?, notes = ?, daysToIrrigate = ? WHERE id = ?", [req.body.name, req.body.pin, req.body.notes, daysOfWeekToIrrigate, req.body.id], (error) => {
            if (error) {
                return db.rollback(function() {
                    throw error;
                });
            }
            db.query("DELETE FROM irrigationRunTimes WHERE irrigationId = ?", [req.body.id], (error) => {
                if (error) {
                    return db.rollback(function() {
                        throw error;
                    });
                }
                const irrigationId = req.body.id;
                let irrigationRunTimeData = runTimeArray.map((element, index) => {
                    return [irrigationId, runTimeArray[index], startTimeArray[index]]
                })
                db.query('INSERT INTO irrigationRunTimes (irrigationId, runTime, startTime) VALUES ?', [irrigationRunTimeData], function() {
                    if (error) {
                        return db.rollback(function() {
                            throw error;
                        });
                    }
                    db.commit(function(err) {
                        if (error) {
                            return db.rollback(function() {
                                throw error;
                            });
                        }
                        res.json({success : "Updated Successfully", status : 200});
                    })
                })
  
            })
        })
    });
})

app.delete("/irrigation", (req, res) => {
    db.beginTransaction(function(err) {
        db.query("DELETE FROM irrigationRunTimes WHERE irrigationId = ?", [req.body.id], (error) => {
            if (error) {
                return db.rollback(function() {
                    throw error;
                });
            }
            db.query("DELETE FROM irrigation WHERE id = ?", [req.body.id], (error) => {
                if (error) {
                    return db.rollback(function() {
                        throw error;
                    });
                }
                db.commit(function(err) {
                    if (error) {
                        return db.rollback(function() {
                            throw error;
                        });
                    }
                    res.render("index");
                });
            });
        })
    })
})

app.get("/irrigation", (req, res) => {
    res.render("irrigation");
});

app.get("/cycleIrrigation", (req, res) => {
    res.render("cycleIrrigation");
});

app.get("/api/cycleIrrigationDevices", (req, res) => {
    let cycleIrrigationDevices = [];
    const sql = "SELECT * FROM cycleIrrigation;";
    db.query(sql,(error, results) => {
        if (error) {
            return db.rollback(function() {
                throw error;
            })
        }
        results.forEach(element => {
            let device = {};
            device.id = element.id;
            device.pin = element.pin;
            device.name = element.name;
            device.notes = element.notes;
            device.state = element.state;
            device.cycleOnTimeHr = element.cycleOnTimeHr;
            device.cycleOnTimeMin = element.cycleOnTimeMin;
            device.cycleOnTimeSec = element.cycleOnTimeSec;
            device.cycleOffTimeHr = element.cycleOffTimeHr;
            device.cycleOffTimeMin = element.cycleOffTimeMin;
            device.cycleOffTimeSec = element.cycleOffTimeSec;
            device.blackoutStartTime = element.blackoutStartTime;
            device.blackoutStopTime = element.blackoutStopTime;

            cycleIrrigationDevices.push(device);
        }) 
        res.json(cycleIrrigationDevices);
    })
})


app.post("/cycleIrrigation", (req, res) => {
    const cycleIrrigationData = {
        pin : req.body.pin,
        name : req.body.name,
        notes : req.body.notes,
        state : req.body.state,
        cycleOnTimeHr : req.body.cycleOnTimeHr,
        cycleOnTimeMin : req.body.cycleOnTimeMin,
        cycleOnTimeSec : req.body.cycleOnTimeSec,
        cycleOffTimeHr : req.body.cycleOffTimeHr,
        cycleOffTimeMin : req.body.cycleOffTimeMin,
        cycleOffTimeSec : req.body.cycleOffTimeSec,
        blackoutStartTime : req.body.blackoutStartTime,
        blackoutStopTime : req.body.blackoutStopTime
    }
    db.query("INSERT INTO cycleIrrigation SET ?", cycleIrrigationData, function(err, result) {
        if (err) {
            return db.rollback(function() {
                throw err;
            })
        }
        db.commit(function(err) {
            if (err) {
                return db.rollback(function() {
                    throw err;
                })
            }
            res.render("index");
        })
    });
});

app.put("/cycleIrrigation", (req, res) => {
    console.log(req.body);
    db.query("UPDATE cycleIrrigation SET pin = ?, name = ?, notes = ?, cycleOnTimeHr = ?, cycleOnTimeMin = ?, cycleOnTimeSec = ?, cycleOffTimeHr = ?, cycleOffTimeMin = ?, cycleOffTimeSec = ?, blackoutStartTime = ?, blackoutStopTime = ? WHERE id=?", [req.body.pin, req.body.name, req.body.notes, req.body.cycleOnTimeHr, req.body.cycleOnTimeMin, req.body.cycleOnTimeSec, req.body.cycleOffTimeHr, req.body.cycleOffTimeMin, req.body.cycleOffTimeSec, req.body.blackoutStartTime, req.body.blackoutStopTime, req.body.id], (error) => {
        if (error) {
            return db.rollback(function() {
                throw error;
            });
        }
        res.json({success : "Updated Successfully", status : 200});
    })
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



const PORT = process.env.PORT || 5000; // check port number environment variable first
    
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));