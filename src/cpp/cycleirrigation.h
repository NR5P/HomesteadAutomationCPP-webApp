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
        CycleIrrigation(std::string id, int pin, std::string notes, int *arrCycleOnTime, int *arrCycleOffTime,
                        int *arrBlackoutStartTime, int *arrBlackoutStopTime)
            : Device(id, pin, notes)
        {
            nextTimeOn = time(NULL) + cycleOffTime;
            setCycleOnTime(arrCycleOnTime[0], arrCycleOnTime[1], arrCycleOnTime[2]);
            setCycleOffTime(arrCycleOffTime[0], arrCycleOffTime[1], arrCycleOffTime[2]);

            setBlackoutStartTime(arrBlackoutStartTime[0], arrBlackoutStartTime[1], arrBlackoutStartTime[2]);
            setBlackoutStopTime(arrBlackoutStopTime[0], arrBlackoutStopTime[1], arrBlackoutStopTime[2]);

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