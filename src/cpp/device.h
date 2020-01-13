#ifndef DEVICE_H
#define DEVICE_H

#include<string>
#include<vector>
#include<ctime>
#include<iostream>
#include "gpio.h"

class Device {
    private:
        std::string id;
        std::string name;
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
        bool getState() const;
        static bool areTimersOn();
        std::string getName() const {
            return name;
        };
        std::string getId() const {
            return id;
        };
        std::string getNotes() const {
            return notes;
        };

        int getPin() const {
            return pin;
        };

};

#endif

