#ifndef CYCLEIRRIGATION_H
#define CYCLEIRRIGATION_H

#include "device.h"
#include <string>
#include <ctime>
#include "gpio.h"

class CycleIrrigation: Device {
    private:
        time_t nextChange;
        time_t cycleOnTime;
        time_t cycleOffTime;
        time_t blackoutStartTime;
        time_t blackoutStopTime;

    public:
        CycleIrrigation(std::string id, int pin, std::string notes, time_t cycleOnTime, time_t cycleOffTime,
                        time_t blackoutStartTime, time_t blackoutStopTime)
            : Device(id, pin, notes), cycleOnTime(cycleOnTime), cycleOffTime(cycleOffTime),
                    blackoutStartTime(blackoutStartTime), blackoutStopTime(blackoutStopTime)
        {
            Device::deviceList.push_back(*this);
        };

        void run();
};


#endif