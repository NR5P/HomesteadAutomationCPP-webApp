#ifndef IRRIGATION_H
#define IRRIGATION_H

#include "device.h"
#include <ctime>
#include <string>
#include <map>
#include "gpio.h"

class Irrigation : Device {
    private:
        time_t cycleOnTime;
        std::map<time_t,time_t> irrigationTimes;

    public:
        Irrigation(std::string id, int pin, std::string notes, time_t cycleOnTime, std::vector<time_t, time_t> startTimes)
            : Device(id, pin, notes), cycleOnTime(cycleOnTime), startTimes(startTimes) 
        {
            Device::deviceList.push_back(*this);
        };

        void run();
        void setIrrigationTimes(int cycle)
};

#endif
