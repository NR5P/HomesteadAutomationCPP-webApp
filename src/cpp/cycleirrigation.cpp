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

void CycleIrrigation::setBlackoutStartTime(int hr, int min, int sec) {
    struct tm *tmBlackoutStartTime = localtime(&unixTimeStamp);
    tmBlackoutStartTime->tm_sec = sec;
    tmBlackoutStartTime->tm_min = min;
    tmBlackoutStartTime->tm_hour = hr;
    if (mktime(tmBlackoutStartTime) != -1)
        blackoutStartTime = mktime(tmBlackoutStartTime);
}

void CycleIrrigation::setBlackoutStopTime(int hr, int min, int sec) {
    struct tm *tmBlackoutStopTime = localtime(&unixTimeStamp);
    tmBlackoutStopTime->tm_sec = sec;
    tmBlackoutStopTime->tm_min = min;
    tmBlackoutStopTime->tm_hour = hr;
    if (mktime(tmBlackoutStopTime) != -1)
        blackoutStopTime = mktime(tmBlackoutStopTime);
}

void CycleIrrigation::setCycleOnTime(int hr, int min, int sec) {
    struct tm *tmCycleOnTime = localtime(&unixTimeStamp);
    tmCycleOnTime->tm_sec = sec;
    tmCycleOnTime->tm_min = min;
    tmCycleOnTime->tm_hour = hr;
    if (mktime(tmCycleOnTime) != -1)
        cycleOnTime = mktime(tmCycleOnTime);
}

void CycleIrrigation::setCycleOffTime(int hr, int min, int sec) {
    struct tm *tmCycleOffTime = localtime(&unixTimeStamp);
    tmCycleOffTime->tm_sec = sec;
    tmCycleOffTime->tm_min = min;
    tmCycleOffTime->tm_hour = hr;
    if (mktime(tmCycleOffTime) != -1)
        cycleOffTime = mktime(tmCycleOffTime);
}




