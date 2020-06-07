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
        let options = "";
        for (let i = 1; i < 11; i += 1) {
            if (Device.pinsUsed.includes(i)) {
                if (i != this.pin)
                    options += `<option disabled>${i}</option>`
            } else {
                options += `<option>${i}</option>`
            }
        }

        let form = `
            <form class="deviceForm"> 
                <label for="name">Name: </label>           
                <input type="text" id="name" name="name" value="${this.name}">

                <label for="pin">Pin: </label>           
                <select name="pin" id="pin">
                    <option>${this.pin}<option>
                    ${options}
                </select>


                <label for="notes">Notes: </label>           
                <input type="textarea" id="notes" name="notes" value="${this.notes}">

                <div class="hr-min-sec-time">
                    <label for="cycleOnTimeHr">Cycle On Time Hr:Min:Sec </label>
                    <input type="number" id="cycleOnTimeHr" class"cycleOnTimeHr" name="cycleOnTimeHr" step="1" value="${this.cycleOnTimeHr}">
                    <span class="colon">:</span>   
                    <input type="number" id="cycleOnTimeMin" class="cycleOnTimeMin" name="cycleOnTimeMin" step="1" value="${this.cycleOnTimeMin}">
                    <span class="colon">:</span>   
                    <input type="number" id="cycleOnTimeSec" class="cycleOnTimeSec" name="cycleOnTimeSec" step="1" value="${this.cycleOnTimeSec}">
                </div>

                <div class="hr-min-sec-time">
                    <label for="cycleOffTimeHr">Cycle Off Time Hr:Min:Sec </label>
                    <input type="number" id="cycleOffTimeHr" class="cycleOffTimeHr" name="cycleOffTimeHr" step="1" value="${this.cycleOffTimeHr}">
                    <span class="colon">:</span>   
                    <input type="number" id="cycleOffTimeMin" class="cycleOffTimeMin" name="cycleOffTimeMin" step="1" value="${this.cycleOffTimeMin}">
                    <span class="colon">:</span>   
                    <input type="number" id="cycleOffTimeSec" class="cycleOffTimeSec" name="cycleOffTimeSec" step="1" value="${this.cycleOffTimeSec}">
                </div>


                <label for="blackoutStartTime">Blackout Start Time</label>
                <input type="time" id="blackoutStartTime" name="blackoutStartTime" value="${this.blackoutStartTime}">

                <label for="blackoutStopTime">Blackout Stop Time</label>
                <input type="time" id="blackoutStopTime" name="blackoutStopTime" value="${this.blackoutStopTime}">

                <button type="button" id="form-submit" class="form-submit">Modify</button>
                <button type="button" class="form-delete">Delete</button>
                <button type="button" class="form-cancel" onclick = "window.location.href = '/';">Cancel</button>
            </form>
        `;
        formElement.innerHTML = form;
        
        if (event.target.nextSibling == null || event.target.nextSibling.tagName != "FORM") {
            event.target.insertAdjacentElement("afterend", formElement);
        } else {
            event.target.parentNode.removeChild(event.target.nextSibling);
        }
        document.getElementById("form-submit").addEventListener("click", () => {
            let data = {
                id : this.id,
                name : document.getElementById("name").value,
                pin : Device.pinsConvertForPi[document.getElementById("pin").value],
                notes : document.getElementById("notes").value,
                cycleOnTimeHr : document.getElementById("cycleOnTimeHr").value,
                cycleOnTimeMin : document.getElementById("cycleOnTimeMin").value,
                cycleOnTimeSec : document.getElementById("cycleOnTimeSec").value,
                cycleOffTimeHr : document.getElementById("cycleOffTimeHr").value,
                cycleOffTimeMin : document.getElementById("cycleOffTimeMin").value,
                cycleOffTimeSec : document.getElementById("cycleOffTimeSec").value,
                blackoutStartTime : document.getElementById("blackoutStartTime").value,
                blackoutStopTime : document.getElementById("blackoutStopTime").value
            }
            console.log(data.id);
            fetch("/cycleIrrigation", {
                method : "PUT",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status == 200)
                    console.log("success");
                    //TODO:
            })
            .catch(error => {
                console.log(error);
            })
        })
    }
};