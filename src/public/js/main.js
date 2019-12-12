import {CycleIrrigationDevice} from "./cycle-irrigation-device.js"

const addDeviceBtn = document.getElementById("drop-btn");
const dropdownContent = document.getElementById("dropdown-content");
let arrDevices = []

window.onload = () => {
    fetch("/api/devices", {method: "GET"})
        .then(res => res.json())
        .then(data => {
            //foreach through them
            data.forEach(function(item) {
                arrDevices.push(new CycleIrrigationDevice(
                    item._id,item.name,item.pin));
            })
        })
}

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