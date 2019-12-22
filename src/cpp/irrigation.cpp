#include "irrigation.h"

void Irrigation::run() {
    now = time(0);
    for (std::vector<time_t>::iterator it = startTimes.begin(); it != startTimes.end(); ++it) {
        if (now == )
    }
}

void Irrigation::setIrrigationTime(int *arrIrrigationStart, int *arrIrrigationDuration) {
    struct tm *tmIrrigationStart = localtime(&unixTimeStamp);
    struct tm *tmIrrigationDuration = localtime(&unixTimeStamp);

    tmIrrigationStart->tm_sec = arrIrrigationStart[0];
    tmIrrigationStart->tm_min = arrIrrigationStart[1];
    tmIrrigationStart->tm_hour = arrIrrigationStart[2];

    tmIrrigationDuration->tm_sec = arrIrrigationDuration[0];
    tmIrrigationDuration->tm_min = arrIrrigationDuration[1];
    tmIrrigationDuration->tm_hour = arrIrrigationDuration[2];

    if (mktime(tmIrrigationStart) != -1 && mktime(tmIrrigationDuration) != -1) {
        irrigationTimes[mktime(tmIrrigationStart)] = mktime(tmIrrigationDuration);
    }



