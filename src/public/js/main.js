import {CycleIrrigationDevice} from "./cycle-irrigation-device.js"
import {IrrigationDevice} from "./irrigation-device.js"
import {Device} from "./device.js"

let arrDevices = []


// build the buttons on main page from db
window.onload = () => {
    //if (document.getElementById("main-area") !== null) {
    function getIrrigationDevices() {
        return fetch("/api/irrigationDevices", {method: "GET"})
            .then(res => res.json())
            .then(data => {
                data.forEach(function(item) {
                    arrDevices.push(new IrrigationDevice(
                        item.id,item.name,item.pin,item.notes, item.state, item.cycleOnTimeArray, item.startTimesArray, item.daysToIrrigate)
                    )
                })
            })
    }
    function getCycleIrrigationDevices() {
        return fetch("/api/cycleIrrigationDevices", {method: "GET"})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                data.forEach(function(item) {
                    arrDevices.push(new CycleIrrigationDevice(
                        item.id, item.name, item.pin, item.notes, item.state, item.cycleOnTimeHr, item.cycleOnTimeMin, 
                        item.cycleOnTimeSec, item.cycleOffTimeHr, item.cycleOffTimeMin, item.cycleOffTimeSec, 
                        item.blackoutStartTime, item.blackoutStopTime
                    ))
                })
            })
    }

        const addDeviceBtn = document.getElementById("drop-btn");
        const dropdownContent = document.getElementById("dropdown-content");
        if (addDeviceBtn !== null) {
            addDeviceBtn.addEventListener("click", () => {
                if (dropdownContent.classList.contains("show")) {
                    dropdownContent.classList.remove("show");
                    dropdownContent.classList.add("noshow");
                } else {
                    dropdownContent.classList.add("show");
                    dropdownContent.classList.remove("noshow");
                }
            })
        }
    //}
    function getAllApis(){
        return Promise.all([getCycleIrrigationDevices(), getIrrigationDevices()]);
    }

    getAllApis()
        .then(() => {
            const selectDiv = document.querySelector(".pin-numbers");
            let options = "<select name='pin' id='pin'>";
            if (selectDiv !== null && selectDiv !== undefined) {
                console.log(Device.pinsUsed);
                for (let i = 1; i < 11; i += 1) {
                    if (Device.pinsUsed.includes(i)) {
                        options += `<option disabled>${i}</option>`
                    } else {
                        options += `<option>${i}</option>`
                    }
                }
                options += "</select>"
                selectDiv.innerHTML = options;
            }
        })
}

