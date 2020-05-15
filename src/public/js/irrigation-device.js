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
        
        //IrrigationDevice.loadEventListeners();

        /*
        document.getElementById("addAnothertime").addEventListener("click", (e) => {
            IrrigationDevice.renderAnotherStartTime(e);
        })
        */
        //)
        /*
        document.querySelector(".on-times").addEventListener("click", (e) => {
            if (e.target.className === "delete-btn") {
                console.log(e.target.parentNode.parentNode.parentNode)
                e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
            }
        })
        */
    }

    //TODO: currently working on this method
    /********************************************************************************
     * to make another irrigation time in the irrigation.handlebars file. It dynamically
     * creates another spot to put another time. this method is ran from an onclick
     * event on the button. 
     * ******************************************************************************/
    /*
    static renderAnotherStartTime(e) {
        const addAnotherBtn = document.getElementById("addAnothertime");
        const elementToAdd = '<input type="time" name="onTime"><span><button class="delete-btn">Delete</button></span>';
        const divToAdd = document.createElement("div");
        divToAdd.innerHTML = elementToAdd;
        e.currentTarget.parentNode.insertBefore(divToAdd,addAnotherBtn);

    }
    */
   static loadEventListeners() {
       document.getElementById("addAnothertime").addEventListener("click", (e) => {
        const addAnotherBtn = document.getElementById("addAnothertime");

        const elementToAddStartTime = `<label for="cycleOnTimeHr" class="cycleOnTime">Cycle On Time Hr:Min:Sec </label>
                                        <input type="number" class"cycleOnTimeHr" name="cycleOnTimeHr" step="1" value="">
                                        <span class="colon">:</span>   
                                        <input type="number" class"cycleOnTimeMin" name="cycleOnTimeMin" step="1" value="">
                                        <span class="colon">:</span>   
                                        <input type="number" class"cycleOnTimeSec" name="cycleOnTimeSec" step="1" value="">`;
        const divToAddForStartTime = document.createElement("div");
        divToAddForStartTime.className = "hr-min-sec-time";
        divToAddForStartTime.innerHTML = elementToAddStartTime;

        const elementToAddOnTime = `<label for="onTime">On Time(s)</label>
                                    <div><input type="time" name="onTime"><span></span></div>`;
        const divToAdd = document.createElement("div");
        divToAdd.className = "on-times";
        divToAdd.innerHTML = elementToAddOnTime;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";
        deleteBtn.innerHTML = "Delete";

        const timesDiv = document.createElement("div");
        timesDiv.className = "times-div";
        timesDiv.appendChild(divToAddForStartTime);
        timesDiv.appendChild(divToAdd);
        timesDiv.appendChild(deleteBtn);

        e.currentTarget.parentNode.insertBefore(timesDiv,addAnotherBtn);
        })

        document.getElementById("deviceForm").addEventListener("click", (e) => {
            if (e.target.className === "delete-btn") {
                console.log(e.target.parentNode.parentNode.parentNode)
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            }
        })
   }
};