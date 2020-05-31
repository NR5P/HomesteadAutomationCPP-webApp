export class Device {

    constructor(id, name, pin, notes, state) {
        this.id = id;
        this.name = name;
        this.pin = Device.pinsConvert[pin];
        this.notes = notes;
        this.state = state;
        Device.pinsUsed.push(this.pin);
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
Device.pinsUsed = [];
Device.pinsConvert = {
    2 : 1,
    3 : 2,
    4 : 3,
    17 : 4,
    27 : 5,
    22 : 6,
    10 : 7,
    9 : 8,
    11 : 9,
    5 : 10
}
