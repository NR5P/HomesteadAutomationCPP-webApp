#include "cycleirrigation.h"

void CycleIrrigation::run() {
    if (!isBlackedOut()) {
        if (getState() == false) {
            if (time(NULL) >= nextTimeOn) {
                turnOn();
                nextTimeOff = time(NULL) + cycleOnTime;
                GPIO::cycleIrrigationOn();
                return;
            } 
        } else {
            if (time(NULL) >= nextTimeOff) {
                turnOff();
                nextTimeOn = time(NULL) + cycleOffTime;
                GPIO::cycleIrrigationOff();
                return;
            }
        }
    }
    turnOff();
    GPIO::cycleIrrigationOff();
}

bool CycleIrrigation::isBlackedOut() {
    if (blackoutStartTime > blackoutStopTime) {
        if (time(NULL) > blackoutStartTime || time(NULL) < blackoutStopTime)
            return true;
    } else {
        if (time(NULL) > blackoutStartTime && time(NULL) < blackoutStopTime)
            return true;
    }
    return false;
}

void CycleIrrigation::setBlackoutStartTime(time_t newBstartTime) {
    struct tm *tmBlackoutStartTime = localtime(&unixTimeStamp);
    struct tm *tmNewBstartTime = localtime(&newBstartTime)
    tmBlackoutStartTime->tm_sec = tmNewBstartTime->tm_sec;
    tmBlackoutStartTime->tm_min = tmNewBstartTime->tm_min;
    tmBlackoutStartTime->tm_hour = tmNewBstartTime->tm_hour;
    if (mktime(tmBlackoutStartTime) != -1)
        blackoutStartTime = mktime(tmBlackoutStartTime);
}

void CycleIrrigation::setBlackoutStopTime(time_t newBstopTime) {
    struct tm *tmBlackoutStopTime = localtime(&unixTimeStamp);
    struct tm *tmNewBstopTime = localtime(&newBstopTime)
    tmBlackoutStopTime->tm_sec = tmNewBstopTime->tm_sec;
    tmBlackoutStopTime->tm_min = tmNewBstopTime->tm_min;
    tmBlackoutStopTime->tm_hour = tmNewBstopTime->tm_hour;
    if (mktime(tmBlackoutStopTime) != -1)
        blackoutStopTime = mktime(tmBlackoutStopTime);
}

void CycleIrrigation::setCycleOnTime(time_t newCycleOnTime) {
    struct tm *tmCycleOnTime = localtime(&unixTimeStamp);
    struct tm *tmNewCycleOnTime = localtime(&newCycleOnTime)
    tmCycleOnTime->tm_sec = tmNewCycleOnTime->tm_sec;
    tmCycleOnTime->tm_min = tmNewCycleOnTime->tm_min;
    tmCycleOnTime->tm_hour = tmNewCycleOnTime->tm_hour;
    if (mktime(tmCycleOnTime) != -1)
        cycleOnTime = mktime(tmCycleOnTime);
}

void CycleIrrigation::setCycleOffTime(time_t newCycleOffTime) {
    struct tm *tmCycleOffTime = localtime(&unixTimeStamp);
    struct tm *tmNewCycleOffTime = localtime(&newCycleOffTime)
    tmCycleOffTime->tm_sec = tmNewCycleOffTime->tm_sec;
    tmCycleOffTime->tm_min = tmNewCycleOffTime->tm_min;
    tmCycleOffTime->tm_hour = tmNewCycleOffTime->tm_hour;
    if (mktime(tmCycleOffTime) != -1)
        cycleOffTime = mktime(tmCycleOffTime);
}




