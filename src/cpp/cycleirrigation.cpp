#include "cycleirrigation.h"

void CycleIrrigation::run() {

}

bool CycleIrrigation::isBlackedOut() {

}


void CycleIrrigation::setBlackoutStartTime(int hr, int min, int sec) {

}

void CycleIrrigation::setBlackoutStopTime(int hr, int min, int sec) {

}

void CycleIrrigation::setCycleOnTime(int hr, int min, int sec) {

}

void CycleIrrigation::setCycleOffTime(int hr, int min, int sec) {

}

std::istream &operator>>(std::istream &in, CycleIrrigation cycleIrrigation) {
    in >> cycleIrrigation.id;
    in >> cycleIrrigation.name;
    in >> cycleIrrigation.notes;
    in >> cycleIrrigation.pin;

    in >> cycleIrrigation.cycleOnTime;
    in >> cycleIrrigation.cycleOffTime;
    in >> cycleIrrigation.blackoutStartTime;
    in >> cycleIrrigation.blackoutStopTime;

}

std::ostream &operator<<(std::ostream &out, const CycleIrrigation &cycleIrrigation) {
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




