#include "cycleirrigation.h"

void CycleIrrigation::run() {
    now = time(0);
    if (now < blackoutStartTime && now > blackoutStopTime) {
        if (now == nextChange) {
            if (this->getState() == 0) {
                this->turnOn();
                nextChange += cycleOnTime;
                GPIO::cycleIrrigationOn();
            } else {
                this-> turnOff();
                nextChange += cycleOffTime;
                GPIO::cycleIrrigationOff();
            }
    } else {
        this->turnOff;
        GPIO::cycleIrrigationOff();
    }
}