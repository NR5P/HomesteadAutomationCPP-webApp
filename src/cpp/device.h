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
        static bool timersOn;
    
    public:
        Device(std::string id, int pin, std::string notes)
            : id(id), pin(pin), notes(notes)
        {};

        void turnOn();
        void turnOff();
        virtual void run() = 0;

        //getters
        bool getState();
        static bool areTimersOn();
};

#endif

