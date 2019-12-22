#ifndef IRRIGATION_H
#define IRRIGATION_H

#include "device.h"
#include <ctime>
#include <string>
#include <map>
#include "gpio.h"

class Irrigation : Device {
    private:
        static const time_t unixTimeStamp = 0;
        std::map<time_t,time_t> irrigationTimes;

    public:
        Irrigation(std::string id, int pin, std::string notes, std::map<int*, int*> mapIrrigationTimes)
            : Device(id, pin, notes) 
        {
            for (std::map<int*, int*>::iterator it = mapIrrigationTimes.begin(); it != mapIrrigationTimes.end(); ++it) {
                setIrrigationTime(it->first, it->second);
            }
            Device::deviceList.push_back(*this);
        }

        void run();
        void setIrrigationTime(int*, int*);
};

#endif
