#ifndef CYCLEIRRIGATION_H
#define CYCLEIRRIGATION_H

#include "device.h"
#include <string>
#include <ctime>
#include <iostream>
#include "gpio.h"

class CycleIrrigation: public Device {
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
        };
        friend std::ostream &operator<<(std::ostream &out, const CycleIrrigation &cycleIrrigation);
        friend std::istream &operator>>(std::istream &in, CycleIrrigation &cycleIrrigation);

        void run();
        bool isBlackedOut();
        
        //setters
        void setBlackoutStartTime(int hr, int min, int sec);
        void setBlackoutStopTime(int hr, int min, int sec);
        void setCycleOnTime(int hr, int min, int sec);
        void setCycleOffTime(int hr, int min, int sec);

        //getters
        long int getCycleOntime() const {
            return static_cast<long int>(cycleOnTime);
        };

        long int getCycleOfftime() const {
            return static_cast<long int>(cycleOffTime);
        };

        long int getNextTimeOn() const {
            return static_cast<long int>(nextTimeOn);
        };

        long int getNextTimeOff() const {
            return static_cast<long int>(nextTimeOff);
        };

        long int getBlackoutStartTime() const {
            return static_cast<long int>(blackoutStartTime);
        };

        long int getBlackoutStopTime() const {
            return static_cast<long int>(blackoutStopTime);
        };
};


inline std::istream &operator>>(std::istream &in, CycleIrrigation &cycleIrrigation) {
    in >> cycleIrrigation.id;
    in >> cycleIrrigation.name;
    in >> cycleIrrigation.notes;
    in >> cycleIrrigation.pin;

    in >> cycleIrrigation.cycleOnTime;
    in >> cycleIrrigation.cycleOffTime;
    in >> cycleIrrigation.blackoutStartTime;
    in >> cycleIrrigation.blackoutStopTime;

}

inline std::ostream &operator<<(std::ostream &out, const CycleIrrigation &cycleIrrigation) {
    out << "cycleIrrigation" << " ";

    out << cycleIrrigation.getId() << " "; 
    out << cycleIrrigation.getName() << " "; 
    out << cycleIrrigation.getNotes() << " "; 
    out << cycleIrrigation.getPin() << " "; 
    out << cycleIrrigation.getState() << " "; 
    out << cycleIrrigation.areTimersOn() << " "; 

    out << cycleIrrigation.getCycleOntime() << " "; 
    out << cycleIrrigation.getCycleOfftime() << " "; 
    out << cycleIrrigation.getNextTimeOn() << " "; 
    out << cycleIrrigation.getNextTimeOff() << " "; 
    out << cycleIrrigation.getBlackoutStartTime() << " "; 
    out << cycleIrrigation.getBlackoutStopTime() << " "; 

    return out;
}


#endif