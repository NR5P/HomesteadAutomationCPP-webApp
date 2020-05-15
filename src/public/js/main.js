import {CycleIrrigationDevice} from "./cycle-irrigation-device.js"
import {IrrigationDevice} from "./irrigation-device.js"

let arrDevices = []

// build the buttons on main page from db
window.onload = () => {
    fetch("/api/irrigationDevices", {method: "GET"})
        .then(res => res.json())
        .then(data => {
            data.forEach(function(item) {
                arrDevices.push(new IrrigationDevice(
                    item._id,item.name,item.pin,item.notes, item.state, item.cycleOnTimeArray, item.startTimesArray)
                )
            })
        })
}

window.onload = () => {
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
}

