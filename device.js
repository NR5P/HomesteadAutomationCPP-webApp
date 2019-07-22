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
        btnElement.setAttribute("class", "deviceBtn");
        btnElement.setAttribute("style", `background-color: ${this.btnColor}`);
        btnElement.setAttribute("class", `${this.class}`)

        btnElement.addEventListener("click", this.renderDeviceSettings);
            

        document.getElementById("main-area").appendChild(btnElement);
    }

    /**********************************************************************
     * render settings under button on main page to allow adjustment of 
     * the device
     *********************************************************************/
    renderDeviceSettings(event) {
        console.log(event)
    }

};