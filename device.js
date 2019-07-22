export class Device {

    constructor(id, name, pin, notes) {
        this.id = id;
        this.name = name;
        this.pin = pin;
        this.notes = notes;
    }

    /**********************************************************************
     * add button to list of buttons that are being displayed 
     *********************************************************************/
    renderBtn() {
        let btnElement = document.createElement("button");
        let btnTxt = document.createTextNode(this.name);
        btnElement.appendChild(btnTxt);
        btnElement.setAttribute("id", "deviceBtn");
        btnElement.setAttribute("style", `background-color: ${this.btnColor}`);
        document.getElementById("main-area").appendChild(btnElement);
    }

    /**********************************************************************
     * render settings under button on main page to allow adjustment of 
     * the device
     *********************************************************************/
    renderDeviceSettings() {

    }

};