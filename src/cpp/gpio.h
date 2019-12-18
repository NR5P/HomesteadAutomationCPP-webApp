#ifndef GPIO_H
#define GPIO_H

#include<iostream>

class GPIO {
    public:
        void static irrigationOn() {
            std::cout << "irrigation on" << std::endl;
        }
        void static irrigationOff() {
            std::cout << "irrigation off" << std::endl;
        }
        void static cycleIrrigationOn() {
            std::cout << "cycle irrigation on" << std::endl;
        }
        void static cycleIrrigationOff() {
            std::cout << "cycle irrigation off" << std::endl;
        }
};

#endif