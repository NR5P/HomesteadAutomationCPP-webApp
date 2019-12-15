import {Device} from "./device.js"

/**********************************************************************
 * for timed irrigation control
 *********************************************************************/
export class IrrigationDevice extends Device{
    constructor(id, name, pin, notes, state, cycleOnTimeHr, cycleOnTimeMin, cycleOnTimeSec,
        startTimesArray) {

        super(id, name, pin, notes, state);

        this.cycleOnTimeHr = cycleOnTimeHr;
        this.cycleOnTimeMin = cycleOnTimeMin;
        this.cycleOnTimeSec = cycleOnTimeSec;
        this.startTimes = startTimesArray || [];
        this.btnColor = "#0394fc";
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
            <form class="deviceForm" action="/irrigation" method="POST"> 
                <label for="name">Name: </label>           
                <input type="text" id="name" name="name" value="${this.name}">

                <label for="pin">Pin: </label>           
                <input type="number" id="pin" name="pin" value="${this.id}">

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

                <div class="on-times">
                    <label for="onTime">On Time(s)</label>
                    ${
                        this.startTimes.forEach(element => {
                            if (element !== null)
                            {
                                console.log(element);
                                return `
                                    <input type="time" name="onTime" value="${element}"><span><button class="delete-btn">Delete</button></span>
                                `
                            }
                        })
                    }
                    <input type="time" name="onTime"><span><button class="delete-btn">Delete</button></span>
                    <button type="button" id="addAnothertime">Add Another Time</button>
                </div>

                <button type="submit" class="form-submit">Add</button>
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

    //TODO: currently working on this method
    /********************************************************************************
     * to make another irrigation time in the irrigation.handlebars file. It dynamically
     * creates another spot to put another time. this method is ran from an onclick
     * event on the button. 
     * ******************************************************************************/
    static renderAnotherStartTime() {
        const onTimeDiv = document.getElementById("onTimeDiv");
        const elementToAdd = '<input type="time" name="onTime"><span><button class="delete-btn">Delete</button></span>';
        let divToAddTo = document.createElement("div");
        divToAddTo.innerHTML(elementToAdd);
        onTimeDiv.appendChild(divToAddTo);
    }
};