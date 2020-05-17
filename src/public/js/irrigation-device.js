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
        formElement.id = "deviceForm";
        formElement.action = "/irrigation";
        formElement.method = "POST";

        let form = `
                <label for="name">Name: </label>           
                <input type="text" id="name" name="name" value="${this.name}">

                <label for="pin">Pin: </label>           
                <input type="number" id="pin" name="pin" value="${this.pin}">

                <label for="notes">Notes: </label>           
                <input type="textarea" id="notes" name="notes" value="${this.notes}">

                ${
                    this.cycleOnTimeArray.map((element, index) => {
                        return `<div class="hr-min-sec-time">
                            <label for="cycleOnTimeHr">Cycle On Time Hr:Min:Sec </label>
                            <input type="number" class="cycleOnTimeHr" name="cycleOnTimeHr" step="1" value="${element.substring(11, 13)}">
                            <span class="colon">:</span>   
                            <input type="number" class="cycleOnTimeMin" name="cycleOnTimeMin" step="1" value="${element.substring(14, 16)}">
                            <span class="colon">:</span>   
                            <input type="number" class="cycleOnTimeSec" name="cycleOnTimeSec" step="1" value="${element.substring(17, 19)}">
                        </div>

                        <div class="on-times">
                            <label for="onTime">On Time(s)</label>
                            <div>
                                <input type="time" class="onTime" name="onTime" value="${this.startTimesArray[index]}"><span></span>
                            </div>
                            <button type="button" class="delete-btn">Delete</button>
                        </div>`
                    })
                }
                <button type="button" id="addAnothertime">Add Another Time</button>

                <button type="button" class="form-submit" id="form-submit">Modify</button>
                <button type="button" class="form-cancel" onclick = "window.location.href = '/';">Cancel</button>
        `;


        formElement.innerHTML = form;

        
        if (event.target.nextSibling == null || event.target.nextSibling.tagName != "FORM") {
            event.target.insertAdjacentElement("afterend", formElement);
        } else {
            event.target.parentNode.removeChild(event.target.nextSibling);
        }

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
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            }
        })
        
        document.getElementById("form-submit").addEventListener("click", () => {
            let data = {
                id : this.id,
                pin : document.getElementById("pin").value,
                name : document.getElementById("name").value,
                notes : document.getElementById("notes").value,
                cycleOnTimeHr : Array.from(document.getElementsByClassName("cycleOnTimeHr")).map(element => element.value),
                cycleOnTimeMin : Array.from(document.getElementsByClassName("cycleOnTimeMin")).map(element => element.value),
                cycleOnTimeSec : Array.from(document.getElementsByClassName("cycleOnTimeSec")).map(element => element.value),
                onTime : Array.from(document.getElementsByClassName("onTime")).map(element => element.value)
            }
            console.log(data.cycleOnTimeHr);
            console.log(data.cycleOnTimeMin);
            console.log(data.cycleOnTimeSec);
            fetch("/irrigation", {
                method : "PUT",
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(data),
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