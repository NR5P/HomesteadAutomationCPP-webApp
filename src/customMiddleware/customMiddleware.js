exports.singleToDoubleDigit = (req,res,next) => {
    if (req.body.cycleOnTimeHr !== undefined && req.body.cycleOnTimeHr.length === 1) {
        req.body.cycleOnTimeHr = "0" + req.body.cycleOnTimeHr;
    }
    if (req.body.cycleOnTimeMin !== undefined && req.body.cycleOnTimeMin.length === 1) {
        req.body.cycleOnTimeMin = "0" + req.body.cycleOnTimeMin;
    }
    if (req.body.cycleOnTimeSec !== undefined && req.body.cycleOnTimeSec.length === 1) {
        req.body.cycleOnTimeSec = "0" + req.body.cycleOnTimeSec;
    }


    next();
}