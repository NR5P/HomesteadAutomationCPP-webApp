import {CycleIrrigationDevice} from "./cycle-irrigation-device.js"

const addDeviceBtn = document.getElementById("drop-btn");
const dropdownContent = document.getElementById("dropdown-content");

//TODO: temporary button to test 
document.getElementById("make-appear").addEventListener("click",() => {
    let button1 = new CycleIrrigationDevice(2, "a name");
});

addDeviceBtn.addEventListener("click", () => {
    if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
        dropdownContent.classList.add("noshow");
    } else {
        dropdownContent.classList.add("show");
        dropdownContent.classList.remove("noshow");
    }
})