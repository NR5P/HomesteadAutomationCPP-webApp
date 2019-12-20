#ifndef IRRIGATION_H
#define IRRIGATION_H

#include "device.h"
#include <ctime>
#include <string>
#include "gpio.h"

class Irrigation : Device {
    private:
        time_t cycleOnTime;
        std::vector<time_t> startTimes;

    public:
        Irrigation(std::string id, int pin, std::string notes, time_t cycleOnTime, std::vector<time_t> startTimes)
            : Device(id, pin, notes), cycleOnTime(cycleOnTime), startTimes(startTimes) 
        {
            Device::deviceList.push_back(*this);
        };
};

#endif
