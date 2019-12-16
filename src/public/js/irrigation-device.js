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
                        this.startTimes.map(element => {
                                return `<div><input type="time" name="onTime" value="${element}"><span><button class="delete-btn">Delete</button></span></div>`
                        })
                    }
                    <div>
                    <input type="time" name="onTime"><span><button type="button" class="delete-btn">Delete</button></span>
                    </div>
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

        document.getElementById("addAnothertime").addEventListener("click", (e) => {
            IrrigationDevice.renderAnotherStartTime(e);
        })

        document.querySelector(".on-times").addEventListener("click", (e) => {
            if (e.target.className === "delete-btn") {
                console.log(e.target.parentNode.parentNode.parentNode)
                e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
            }
        })
    }

    //TODO: currently working on this method
    /********************************************************************************
     * to make another irrigation time in the irrigation.handlebars file. It dynamically
     * creates another spot to put another time. this method is ran from an onclick
     * event on the button. 
     * ******************************************************************************/
    static renderAnotherStartTime(e) {
        const addAnotherBtn = document.getElementById("addAnothertime");
        const elementToAdd = '<input type="time" name="onTime"><span><button class="delete-btn">Delete</button></span>';
        const divToAdd = document.createElement("div");
        divToAdd.innerHTML = elementToAdd;
        e.currentTarget.parentNode.insertBefore(divToAdd,addAnotherBtn);
    }
};