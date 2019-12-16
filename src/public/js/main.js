import {CycleIrrigationDevice} from "./cycle-irrigation-device.js"
import {IrrigationDevice} from "./irrigation-device.js"

const addDeviceBtn = document.getElementById("drop-btn");
const dropdownContent = document.getElementById("dropdown-content");
let arrDevices = []

window.onload = () => {
    fetch("/api/devices", {method: "GET"})
        .then(res => res.json())
        .then(data => {
            data.cycle.forEach(function(item) {
                arrDevices.push(new CycleIrrigationDevice(
                    item._id,item.name,item.pin,item.notes, item.state, item.cycleOnTimeHour, item.cycleOnTimeMin, item.cycleOnTimeSec, item.cycleOffTimeHour,
                    item.cycleOffTimeMin, item.cycleOffTimeSec, item.blackoutStartTime, item.blackoutStopTime
                ));
            })
            data.irrigate.forEach(function(item) {
                arrDevices.push(new IrrigationDevice(
                    item._id,item.name,item.pin,item.notes, item.state, item.cycleOnTimeHour, item.cycleOnTimeMin, item.cycleOnTimeSec,
                    item.startTimes
                ))

            })
        })
}

addDeviceBtn.addEventListener("click", () => {
    if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
        dropdownContent.classList.add("noshow");
    } else {
        dropdownContent.classList.add("show");
        dropdownContent.classList.remove("noshow");
    }
})
