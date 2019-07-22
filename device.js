export class Device {

    static deviceList = ["this", "that", "the"];
        
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
        //btnElement.setAttribute("class", "deviceBtn");
        btnElement.setAttribute("style", `background-color: ${this.btnColor}`);
        btnElement.setAttribute("class", `${this.class}`)

        btnElement.addEventListener("click", (event) => {
            this.renderDeviceSettings(event);
        });

        document.getElementById("main-area").appendChild(btnElement);
    }
};