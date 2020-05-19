exports.singleToDoubleDigit = (req,res,next) => {
    if (req.body.cycleOnTimeHr !== undefined) {
        if (Array.isArray(req.body.cycleOnTimeHr)) {
            req.body.cycleOnTimeHr.forEach(element => {
                if (element.length === 1) {
                    element = "0" + element;
                } 
            });
        } else {
            if (req.body.cycleOnTimeHr.length === 1) {
                req.body.cycleOnTimeHr = "0" + req.body.cycleOnTimeHr;
            }
        }
    }

    if (req.body.cycleOnTimeMin !== undefined) {
        if (Array.isArray(req.body.cycleOnTimeHr)) {
            req.body.cycleOnTimeMin.forEach(element => {
                if (element.length === 1) {
                    element = "0" + element;
                } 
            });
        } else {
            if (req.body.cycleOnTimeMin.length === 1) {
                req.body.cycleOnTimeMin = "0" + req.body.cycleOnTimeMin;
            }
        }
    }

    if (req.body.cycleOnTimeSec !== undefined) {
        if (Array.isArray(req.body.cycleOnTimeHr)) {
            req.body.cycleOnTimeSec.forEach(element => {
                if (element.length === 1) {
                    element = "0" + element;
                } 
            });
        } else {
            if (req.body.cycleOnTimeSec.length === 1) {
                req.body.cycleOnTimeSec = "0" + req.body.cycleOnTimeSec;
            }
        }
    }


    next();
}