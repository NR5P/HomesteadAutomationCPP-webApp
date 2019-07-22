import {Device} from "./device.js"

/**********************************************************************
 * for timed irrigation control
 *********************************************************************/
export class IrrigationDevice extends Device{
    constructor(id, name, pin, notes, cycleOnTime, cycleOffTime, 
        blackoutStartTime, blackoutStopTime) {

        super(id, name, pin, notes);

        this.cycleOnTime = cycleOnTime;
        this.cycleOffTime = cycleOffTime;
        this.blackoutStartTime = blackoutStartTime;
        this.blackoutStopTime = blackoutStopTime;
        this.whenCreated;
        this.btnColor = "blue";

        this.renderBtn();
    }
};