#include "cycleirrigation.h"

void CycleIrrigation::run() {
/*
    tmBlackoutStartTime = localtime(&now);
    tmBlackoutStartTime->tm_hour = localtime(&blackoutStartTime)->tm_hour;
    tmBlackoutStartTime->tm_min = localtime(&blackoutStartTime)->tm_min;
    tmBlackoutStartTime->tm_sec = localtime(&blackoutStartTime)->tm_sec;

    tmBlackoutStopTime = localtime(&now);
*/

bool CycleIrrigation::isBlackedOut() {

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





