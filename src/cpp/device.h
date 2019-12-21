#ifndef DEVICE_H
#define DEVICE_H

#include<string>
#include<vector>
#include<ctime>
#include "gpio.h"

class Device {
    private:
        std::string id;
        std::string notes;
        int pin;
        bool state;
    
    protected:
        time_t now;
        bool onOff;

    public:
        static std::vector<Device> deviceList;
        Device(std::string id, int pin, std::string notes)
            : id(id), pin(pin), notes(notes)
        {};

        void turnOn();
        void turnOff();
        bool getState();
};

#endif

