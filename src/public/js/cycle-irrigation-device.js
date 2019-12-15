import {Device} from "./device.js"

/**********************************************************************
 * for timed irrigation control
 *********************************************************************/
export class CycleIrrigationDevice extends Device{
    constructor(id, name, pin, notes, state, cycleOnTimeHr, cycleOnTimeMin, cycleOnTimeSec, cycleOffTimeHr,
        cycleOffTimeMin, cycleOffTimeSec, blackoutStartTime, blackoutStopTime) {

        super(id, name, pin, notes, state);

        this.cycleOnTimeHr = cycleOnTimeHr;
        this.cycleOnTimeMin = cycleOnTimeMin;
        this.cycleOnTimeSec = cycleOnTimeSec;
        this.cycleOffTimeHr = cycleOffTimeHr;
        this.cycleOffTimeMin = cycleOffTimeMin;
        this.cycleOffTimeSec = cycleOffTimeSec;
        this.blackoutStartTime = blackoutStartTime;
        this.blackoutStopTime = blackoutStopTime;
        this.btnColor = "#5757f2";
        this.class = "cycle-irrigation-device-btn";
            
        this.renderBtn();
    }

    /**********************************************************************
     * render settings under button on main page to allow adjustment of 
     * the device
     *********************************************************************/
    renderDeviceSettings(event) {
        //console.log(event.target);
        //event.target.innerHTML = "something";
        //console.log(this.name); // does not know the name here
        //this.name = "something";
        //console.log(this.name); // does not know the name here
        //event.target.innerHTML = "something";
        //console.log(Device.deviceList);
        let formElement = document.createElement("form");

        let form = `
            <form class="deviceForm"> 
                <label for="name">Name: </label>           
                <input type="text" id="name" name="name" value="${this.name}">

                <label for="pin">Pin: </label>           
                <input type="number" id="pin" name="pin" value="${this.pin}">

                <label for="notes">Notes: </label>           
                <input type="textarea" id="notes" name="notes" value="${this.notes}">

                <div class="hr-min-sec-time">
                    <label for="cycleOnTimeHr">Cycle On Time Hr:Min:Sec </label>
                    <input type="number" class"cycleOnTimeHr" name="cycleOnTimeHr" step="1" value="${this.cycleOnTimeHr}">
                    <span class="colon">:</span>   
                    <input type="number" class"cycleOnTimeMin" name="cycleOnTimeMin" step="1" value="${this.cycleOnTimeMin}">
                    <span class="colon">:</span>   
                    <input type="number" class"cycleOnTimeSec" name="cycleOnTimeSec" step="1" value="${this.cycleOnTimeSec}">
                </div>

                <div class="hr-min-sec-time">
                    <label for="cycleOffTimeHr">Cycle Off Time Hr:Min:Sec </label>
                    <input type="number" class"cycleOffTimeHr" name="cycleOffTimeHr" step="1" value="${this.cycleOffTimeHr}">
                    <span class="colon">:</span>   
                    <input type="number" class"cycleOffTimeMin" name="cycleOffTimeMin" step="1" value="${this.cycleOffTimeMin}">
                    <span class="colon">:</span>   
                    <input type="number" class"cycleOffTimeSec" name="cycleOffTimeSec" step="1" value="${this.cycleOffTimeSec}">
                </div>


                <label for="blackoutStartTime">Blackout Start Time</label>
                <input type="time" id"blackoutStartTime" name="blackoutStartTime" value="${this.blackoutStartTime}">

                <label for="blackoutStopTime">Blackout Stop Time</label>
                <input type="time" id"blackoutStopTime" name="blackoutStopTime" value="${this.blackoutStopTime}">

                <button type="button" class="form-submit">Submit</button>
                <button type="button" class="form-cancel" onclick = "window.location.href = '/';">Cancel</button>
                <button type="button" class="form-delete">Delete</button>
            </form>
        `;
        formElement.innerHTML = form;
        
        if (event.target.nextSibling == null || event.target.nextSibling.tagName != "FORM") {
            event.target.insertAdjacentElement("afterend", formElement);
        } else {
            event.target.parentNode.removeChild(event.target.nextSibling);
        }
        console.log(event.target.nextSibling.tagName);
        console.log(event.target.parentNode);
    }
};