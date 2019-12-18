#ifndef DEVICE_H
#define DEVICE_H

#include<string>
#include<vector>
#include "gpio.h"

class Device {
    private:
        std::string id;
        std::string notes;
        int pin;
        bool state;

        static std::vector<Device> deviceList;

    public:
        Device(std::string id, int pin, std::string notes)
            : id(id), pin(pin), notes(notes)
        {};
};

#endif

