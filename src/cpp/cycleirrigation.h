#ifndef CYCLEIRRIGATION_H
#define CYCLEIRRIGATION_H

#include "device.h"
#include <string>
#include <ctime>
#include "gpio.h"

class CycleIrrigation: Device {
    private:
        static const time_t unixTimeStamp = 0;

        time_t cycleOnTime;
        time_t cycleOffTime;

        time_t blackoutStartTime;
        time_t blackoutStopTime;

        bool blackedOut;

    public:
        CycleIrrigation(std::string id, int pin, std::string notes, time_t cycleOnTime, time_t cycleOffTime,
                        time_t blackoutStartTime, time_t blackoutStopTime)
            : Device(id, pin, notes), cycleOnTime(cycleOnTime), cycleOffTime(cycleOffTime),
                    blackoutStartTime(blackoutStartTime), blackoutStopTime(blackoutStopTime)
        {
            Device::deviceList.push_back(*this);
            blackoutDuration = blackoutStopTime - blackoutStartTime;
        };

        void run();
        bool isBlackedOut();
        
        //setters
        void setBlackoutStartTime(int hr, int min, int sec);
        void setBlackoutStopTime(int hr, int min, int sec);
};


#endif