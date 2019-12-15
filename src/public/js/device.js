export class Device {

    constructor(id, name, pin, notes, state) {
        this.id = id;
        this.name = name;
        this.pin = pin;
        this.notes = notes;
        this.state = state;
    }

    /**********************************************************************
     * add button to list of buttons that are being displayed 
     *********************************************************************/
    renderBtn() {
        let btnElement = document.createElement("button");
        let iconElement = document.createElement("img");
        iconElement.setAttribute("src",`imgs/icons/${this.state}.png`)
        iconElement.setAttribute("class","on-indicator");
        let btnTxt = document.createTextNode(this.name);
        btnElement.appendChild(iconElement);
        btnElement.appendChild(btnTxt);
        btnElement.setAttribute("style", `background-color: ${this.btnColor}`);
        btnElement.setAttribute("class", `${this.class}`)

        btnElement.addEventListener("click", (event) => {
            this.renderDeviceSettings(event);
        });

        document.getElementById("main-area").appendChild(btnElement);
    }
};