#include "irrigation.h"

void Irrigation::run() {
    for (std::map<time_t, time_t>::iterator it = irrigationTimes.begin(); it != irrigationTimes.end(); ++it) {
        if (time(NULL) > it->first && time(NULL) < it->first + it->second) {
            turnOn();
            GPIO::irrigationOn();
        } else {
            turnOff();
            GPIO::irrigationOff();
        }
    }
}

void Irrigation::setIrrigationTime(int *arrIrrigationStart, int *arrIrrigationDuration) {
    struct tm *tmIrrigationStart = localtime(0);
    struct tm *tmIrrigationDuration = localtime(0);

    tmIrrigationStart->tm_sec = arrIrrigationStart[0];
    tmIrrigationStart->tm_min = arrIrrigationStart[1];
    tmIrrigationStart->tm_hour = arrIrrigationStart[2];

    tmIrrigationDuration->tm_sec = arrIrrigationDuration[0];
    tmIrrigationDuration->tm_min = arrIrrigationDuration[1];
    tmIrrigationDuration->tm_hour = arrIrrigationDuration[2];

    if (mktime(tmIrrigationStart) != -1 && mktime(tmIrrigationDuration) != -1) {
        irrigationTimes[mktime(tmIrrigationStart)] = mktime(tmIrrigationDuration);
    }
}


