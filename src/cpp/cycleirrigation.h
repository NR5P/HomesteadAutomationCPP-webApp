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

        time_t nextTimeOn;
        time_t nextTimeOff;

        time_t blackoutStartTime;
        time_t blackoutStopTime;

    public:
        CycleIrrigation(std::string id, int pin, std::string notes, time_t cycleOnTime, time_t cycleOffTime,
                        time_t blackoutStartTime, time_t blackoutStopTime)
            : Device(id, pin, notes), cycleOnTime(cycleOnTime), cycleOffTime(cycleOffTime),
                    blackoutStartTime(blackoutStartTime), blackoutStopTime(blackoutStopTime)
        {
            nextTimeOn = time(NULL) + cycleOffTime;
            Device::deviceList.push_back(*this);
        };

        void run();
        bool isBlackedOut();
        
        //setters
        void setBlackoutStartTime(int hr, int min, int sec);
        void setBlackoutStopTime(int hr, int min, int sec);
        void setCycleOnTime(int hr, int min, int sec);
        void setCycleOffTime(int hr, int min, int sec);
};


#endif