#include "device.h"

bool Device::timersOn = 0;

void Device::turnOn() {
    this->state = 1;
}

void Device::turnOff() {
    this->state = 0;
}

bool Device::getState() {
    return state;
}

bool Device::areTimersOn() {
    return timersOn;
}