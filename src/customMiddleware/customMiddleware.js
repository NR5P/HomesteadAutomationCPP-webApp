exports.singleToDoubleDigit = (req,res,next) => {
    if (req.body.cycleOnTimeHr !== undefined) {
        req.body.cycleOnTimeHr.forEach(element => {
            if (element.length === 1) {
                element = "0" + element;
            } 
        });
    }

    if (req.body.cycleOnTimeMin !== undefined) {
        req.body.cycleOnTimeMin.forEach(element => {
            if (element.length === 1) {
                element = "0" + element;
            } 
        });
    }

    if (req.body.cycleOnTimeSec !== undefined) {
        req.body.cycleOnTimeSec.forEach(element => {
            if (element.length === 1) {
                element = "0" + element;
            } 
        });
    }


    next();
}