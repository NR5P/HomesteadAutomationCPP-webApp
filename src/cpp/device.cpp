#include "device.h"

void Device::turnOn() {
    this->state = 1;
}

void Device::turnOff() {
    this->state = 0;
}

bool Device::getState() {
    return state;
}