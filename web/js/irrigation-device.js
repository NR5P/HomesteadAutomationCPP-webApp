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
        this.btnColor = "blue";
        this.class = "irrigation-device-btn";
            
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

                <label for="cycleOnTime">Cycle On Time: </label>
                <input type="time" id"cycleOnTime" name="cycleOnTime" step="1" value="${this.cycleOnTime}">

                <label for="cycleOffTime">Cycle Off Time: </label>
                <input type="time" id"cycleOffTime" name="cycleOffTime" step="1" value="${this.cycleOffTime}">

                <label for="blackoutStartTime">Blackout Start Time</label>
                <input type="time" id"blackoutStartTime" name="blackoutStartTime" value="${this.blackoutStartTime}">

                <label for="blackoutStopTime">Blackout Stop Time</label>
                <input type="time" id"blackoutStopTime" name="blackoutStopTime" value="${this.blackoutStopTime}">

                <button type="button" class="form-submit">Submit</button>
                <button type="button" class="form-cancel">Cancel</button>
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