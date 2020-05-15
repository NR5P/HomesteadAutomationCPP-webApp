import {Device} from "./device.js"

/**********************************************************************
 * for timed irrigation control
 *********************************************************************/
export class IrrigationDevice extends Device{
    constructor(id, name, pin, notes, state, cycleOnTimeArray, startTimesArray) {

        super(id, name, pin, notes, state);

        this.cycleOnTimeArray = cycleOnTimeArray || [];
        this.startTimesArray = startTimesArray || [];
        this.btnColor = "#0394fc";
        this.class = "irrigation-device-btn";
            
        this.renderBtn();
    }

    /**********************************************************************
     * render settings under button on main page to allow adjustment of 
     * the device
     *********************************************************************/
    renderDeviceSettings(event) {
        let formElement = document.createElement("form");

        let form = `
            <form class="deviceForm" id="deviceForm" action="/irrigation" method="POST"> 
                <label for="name">Name: </label>           
                <input type="text" id="name" name="name" value="${this.name}">

                <label for="pin">Pin: </label>           
                <input type="number" id="pin" name="pin" value="${this.pin}">

                <label for="notes">Notes: </label>           
                <input type="textarea" id="notes" name="notes" value="${this.notes}">

                ${
                    this.cycleOnTimeArray.map((element, index) => {
                        console.log(element.substr(11, 12));
                        return `<div class="hr-min-sec-time">
                            <label for="cycleOnTimeHr">Cycle On Time Hr:Min:Sec </label>
                            <input type="number" class="cycleOnTimeHr" name="cycleOnTimeHr" step="1" value="${element.substr(11, 12)}">
                            <span class="colon">:</span>   
                            <input type="number" class="cycleOnTimeMin" name="cycleOnTimeMin" step="1" value="${element.substr(14, 15)}">
                            <span class="colon">:</span>   
                            <input type="number" class="cycleOnTimeSec" name="cycleOnTimeSec" step="1" value="${element.substr(17, 18)}">
                        </div>

                        <div class="on-times">
                            <label for="onTime">On Time(s)</label>
                            <div>
                                <input type="time" name="onTime" value="${this.startTimesArray[index]}"><span></span>
                            </div>
                            <button type="button" class="delete-btn">Delete</button>
                        </div>`
                    })
                }
                <button type="button" id="addAnothertime">Add Another Time</button>

                <button type="submit" class="form-submit">Add</button>
                <button type="button" class="form-cancel" onclick = "window.location.href = '/';">Cancel</button>
            </form>
            <script src="./irrigation.js"></script>
        `;


        formElement.innerHTML = form;

        
        if (event.target.nextSibling == null || event.target.nextSibling.tagName != "FORM") {
            event.target.insertAdjacentElement("afterend", formElement);
        } else {
            event.target.parentNode.removeChild(event.target.nextSibling);
        }
        
    }
};