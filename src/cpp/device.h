#ifndef DEVICE_H
#define DEVICE_H

#include<string>
#include<vector>
#include<ctime>
#include<iostream>
#include "gpio.h"

class Device {
    protected:
        std::string id;
        std::string name;
        std::string notes;
        int pin;
        bool state;

    private:
        static bool timersOn;

    
    public:
        static std::vector<Device *> deviceList;

        Device(std::string id, int pin, std::string notes)
            : id(id), pin(pin), notes(notes)
        {};

        friend std::ostream &operator<<(std::ostream &out, const CycleIrrigation &cycleIrrigation);
        friend std::istream &operator>>(std::istream &out, const CycleIrrigation cycleIrrigation);

        static void deSerialize(char returnMessage[256],int length = 256);

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


        //setters
        void setId(std::string id) {
            this->id = id;
        }

};

#endif

